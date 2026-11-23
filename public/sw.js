/* Replaced with the deployment version during the static build. */
const BUILD_VERSION = "__BUILD_VERSION__";
const CACHE_PREFIX = "doors-offline-";
const CACHE_NAME = `${CACHE_PREFIX}${BUILD_VERSION}`;
const MANIFEST_URL = new URL("offline-assets.json", self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        const response = await fetch(MANIFEST_URL, { cache: "no-cache" });

        if (response.ok) {
          await cache.put(MANIFEST_URL, response);
        }
      } catch {
        // The app can still install; the page retries the asset list online.
      }

      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "OFFLINE_READY") {
    return;
  }

  event.waitUntil(
    (async () => {
      const names = await caches.keys();

      await Promise.all(
        names
          .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })()
  );
});

const rangeResponse = async (response, rangeHeader) => {
  if (response.status !== 200 || !rangeHeader) {
    return response;
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());

  if (!match) {
    return new Response(null, { status: 416 });
  }

  const body = await response.arrayBuffer();
  const size = body.byteLength;
  let start = match[1] ? Number(match[1]) : null;
  let end = match[2] ? Number(match[2]) : null;

  if (start === null) {
    const suffixLength = end ?? 0;
    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  } else {
    end = Math.min(end ?? size - 1, size - 1);
  }

  if (start >= size || end < start) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}` },
    });
  }

  const headers = new Headers(response.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Content-Length", String(end - start + 1));
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);

  return new Response(body.slice(start, end + 1), {
    status: 206,
    statusText: "Partial Content",
    headers,
  });
};

const cachedResponse = async (
  request,
  includeRouteAlternates = false,
  includeAppShellFallback = false
) => {
  const url = new URL(request.url);
  const candidates = [request];

  if (includeRouteAlternates) {
    const path = url.pathname;
    const withoutTrailingSlash = path.endsWith("/") ? path.slice(0, -1) : path;
    const alternatePaths =
      path === "/"
        ? ["/index.html"]
        : [
            `${withoutTrailingSlash}.html`,
            `${withoutTrailingSlash}/index.html`,
            path.endsWith("/") ? path : `${path}/`,
          ];

    if (includeAppShellFallback) {
      alternatePaths.push("/");
    }

    for (const pathname of alternatePaths) {
      candidates.push(new Request(new URL(pathname, url.origin).href));
    }
  }

  const cacheNames = await caches.keys();
  const orderedNames = [CACHE_NAME, ...cacheNames.filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)];

  for (const name of orderedNames) {
    const cache = await caches.open(name);

    for (const candidate of candidates) {
      const response = await cache.match(candidate);

      if (response) {
        return response;
      }
    }
  }

  return null;
};

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    (async () => {
      const lookupRequest = request.headers.has("Range")
        ? new Request(url.href, { credentials: request.credentials })
        : request;
      const cached = await cachedResponse(lookupRequest, request.mode === "navigate");

      if (cached) {
        return request.headers.has("Range")
          ? rangeResponse(cached, request.headers.get("Range"))
          : cached;
      }

      try {
        return await fetch(request);
      } catch {
        const fallback = await cachedResponse(
          lookupRequest,
          request.mode === "navigate",
          request.mode === "navigate"
        );

        if (fallback) {
          return request.headers.has("Range")
            ? rangeResponse(fallback, request.headers.get("Range"))
            : fallback;
        }

        return new Response("Este conteúdo ainda não foi baixado para uso offline.", {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }
    })()
  );
});
