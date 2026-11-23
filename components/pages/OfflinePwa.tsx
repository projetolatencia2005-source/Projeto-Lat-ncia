import { useCallback, useEffect, useRef, useState } from "react";

type OfflineAsset = { bytes: number; url: string };
type OfflineAssetManifest = {
  assets: OfflineAsset[];
  totalBytes: number;
  totalFiles: number;
  version: string;
};
type OfflineStatus =
  | "checking"
  | "downloading"
  | "ready"
  | "offline"
  | "error"
  | "storage";

const CACHE_PREFIX = "doors-offline-";

const formatSize = (bytes: number): string => {
  const megabytes = bytes / 1024 / 1024;

  return megabytes >= 1024
    ? `${(megabytes / 1024).toFixed(2)} GB`
    : `${Math.round(megabytes)} MB`;
};

const OfflinePwa: FC = () => {
  const [isInstalledMode, setIsInstalledMode] = useState(false);
  const [status, setStatus] = useState<OfflineStatus>("checking");
  const [progress, setProgress] = useState({ bytes: 0, files: 0, totalBytes: 0, totalFiles: 0 });
  const [retryCount, setRetryCount] = useState(0);
  const running = useRef(false);

  const startOfflineDownload = useCallback(async (): Promise<void> => {
    if (running.current) {
      return;
    }

    running.current = true;
    setStatus("checking");

    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });

      await navigator.serviceWorker.ready;

      if (!navigator.onLine) {
        const savedManifest = await fetch("/offline-assets.json").then((response) =>
          response.ok ? (response.json() as Promise<OfflineAssetManifest>) : null
        );

        if (!savedManifest) {
          setStatus("offline");
          return;
        }

        const cache = await caches.open(`${CACHE_PREFIX}${savedManifest.version}`);
        let cachedFiles = 0;
        let cachedBytes = 0;

        for (const asset of savedManifest.assets) {
          if (await cache.match(new Request(new URL(asset.url, location.origin).href))) {
            cachedFiles += 1;
            cachedBytes += asset.bytes;
          }
        }

        setProgress({
          bytes: cachedBytes,
          files: cachedFiles,
          totalBytes: savedManifest.totalBytes,
          totalFiles: savedManifest.totalFiles,
        });
        setStatus(cachedFiles === savedManifest.totalFiles ? "ready" : "offline");
        return;
      }

      const response = await fetch("/offline-assets.json", { cache: "no-cache" });

      if (!response.ok) {
        throw new Error("Não foi possível carregar a lista de arquivos.");
      }

      const manifest = (await response.json()) as OfflineAssetManifest;
      const cacheName = `${CACHE_PREFIX}${manifest.version}`;
      const cache = await caches.open(cacheName);
      const storage = navigator.storage;

      try {
        await storage?.persist?.();
      } catch {
        // Continue when persistent storage is not granted.
      }

      let bytesDone = 0;
      let filesDone = 0;
      const missing: OfflineAsset[] = [];

      setProgress({
        bytes: 0,
        files: 0,
        totalBytes: manifest.totalBytes,
        totalFiles: manifest.totalFiles,
      });

      for (const asset of manifest.assets) {
        const request = new Request(new URL(asset.url, location.origin).href);

        if (await cache.match(request)) {
          bytesDone += asset.bytes;
          filesDone += 1;
        } else {
          missing.push(asset);
        }
      }

      setProgress({
        bytes: bytesDone,
        files: filesDone,
        totalBytes: manifest.totalBytes,
        totalFiles: manifest.totalFiles,
      });

      if (missing.length === 0) {
        setStatus("ready");
        navigator.serviceWorker.controller?.postMessage({ type: "OFFLINE_READY" });
        return;
      }

      const estimate = await storage?.estimate?.();
      const remainingBytes = missing.reduce((sum, asset) => sum + asset.bytes, 0);

      if (
        estimate?.quota &&
        estimate.usage !== undefined &&
        estimate.quota - estimate.usage < remainingBytes * 1.05
      ) {
        setStatus("storage");
        return;
      }

      setStatus("downloading");
      let nextAsset = 0;
      let failed = false;

      const downloadWorker = async (): Promise<void> => {
        while (!failed) {
          const index = nextAsset;
          nextAsset += 1;

          if (index >= missing.length) {
            return;
          }

          const asset = missing[index];
          const request = new Request(new URL(asset.url, location.origin).href, {
            cache: "reload",
          });

          try {
            const assetResponse = await fetch(request);

            if (!assetResponse.ok) {
              throw new Error(`Falha ao baixar ${asset.url}.`);
            }

            await cache.put(request, assetResponse);
            bytesDone += asset.bytes;
            filesDone += 1;
            setProgress({
              bytes: bytesDone,
              files: filesDone,
              totalBytes: manifest.totalBytes,
              totalFiles: manifest.totalFiles,
            });
          } catch {
            failed = true;
          }
        }
      };

      await Promise.all([downloadWorker(), downloadWorker(), downloadWorker()]);

      if (failed || filesDone !== manifest.totalFiles) {
        setStatus(navigator.onLine ? "error" : "offline");
        return;
      }

      setStatus("ready");
      (navigator.serviceWorker.controller || registration.active)?.postMessage({
        type: "OFFLINE_READY",
      });
    } catch {
      setStatus(navigator.onLine ? "error" : "offline");
    } finally {
      running.current = false;
    }
  }, []);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    let cancelled = false;

    void fetch("/offline-assets.json", { method: "HEAD", cache: "no-store" })
      .then((response) => {
        if (response.ok && !cancelled) {
          return navigator.serviceWorker.register("/sw.js", {
            scope: "/",
            updateViaCache: "none",
          });
        }

        return undefined;
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const standaloneQuery = window.matchMedia("(display-mode: standalone)");
    const updateInstallMode = (): void => {
      setIsInstalledMode(
        standaloneQuery.matches ||
          (navigator as Navigator & { standalone?: boolean }).standalone === true
      );
    };
    const onInstalled = (): void => setIsInstalledMode(true);

    updateInstallMode();
    standaloneQuery.addEventListener("change", updateInstallMode);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      standaloneQuery.removeEventListener("change", updateInstallMode);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (!isInstalledMode) {
      return;
    }

    void startOfflineDownload();

    const onOnline = (): void => void startOfflineDownload();
    window.addEventListener("online", onOnline);

    return () => window.removeEventListener("online", onOnline);
  }, [isInstalledMode, retryCount, startOfflineDownload]);

  if (!isInstalledMode) {
    return null;
  }

  const percent = progress.totalBytes
    ? Math.min(100, Math.floor((progress.bytes / progress.totalBytes) * 100))
    : 0;
  const messages: Record<OfflineStatus, string> = {
    checking: "Preparando o modo offline…",
    downloading: "Baixando o site para usar sem internet",
    ready: "Site pronto para usar offline",
    offline: "Conecte à internet para terminar o download offline",
    error: "O download foi interrompido. Toque para continuar.",
    storage: "Libere espaço neste notebook para guardar o site offline",
  };

  return (
    <aside
      aria-live="polite"
      role="status"
      style={{
        position: "fixed",
        zIndex: 2147483000,
        top: 12,
        left: 12,
        width: "min(340px, calc(100vw - 24px))",
        color: "#31302c",
        background: "#f7edd7",
        border: "3px solid #31302c",
        boxShadow: "6px 6px 0 #31302c",
        font: "14px/1.4 Pixelify Sans, sans-serif",
      }}
    >
      <div
        style={{
          padding: "7px 10px",
          color: "#f7edd7",
          background: "#7d94b8",
          borderBottom: "3px solid #31302c",
        }}
      >
        Modo offline
      </div>
      <div style={{ padding: 10 }}>
        <div>{messages[status]}</div>
        {(status === "downloading" || status === "ready" || progress.totalFiles > 0) && (
          <>
            <div style={{ marginTop: 5 }}>
              {percent}% · {progress.files.toLocaleString("pt-BR")} de{" "}
              {progress.totalFiles.toLocaleString("pt-BR")} arquivos · {formatSize(progress.bytes)} de{" "}
              {formatSize(progress.totalBytes)}
            </div>
            <div
              aria-label={`Download offline ${percent}% concluído`}
              role="progressbar"
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={percent}
              style={{
                height: 10,
                marginTop: 7,
                background: "#d7e4f5",
                border: "2px solid #31302c",
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: "100%",
                  background: "#7d94b8",
                }}
              />
            </div>
          </>
        )}
        {(status === "error" || status === "offline" || status === "storage") && (
          <button
            onClick={() => setRetryCount((count) => count + 1)}
            style={{
              marginTop: 8,
              padding: "4px 8px",
              color: "#31302c",
              background: "#f7edd7",
              border: "2px solid #31302c",
              font: "inherit",
              cursor: "pointer",
            }}
            type="button"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </aside>
  );
};

export default OfflinePwa;
