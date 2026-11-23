const fs = require("node:fs");
const path = require("node:path");

const projectRoot = process.cwd();
const outputDirectory = path.join(projectRoot, "out");
const publicDirectory = path.join(projectRoot, "public");
const serviceWorkerTemplate = path.join(publicDirectory, "sw.js");
const outputManifest = path.join(outputDirectory, "offline-assets.json");
const outputServiceWorker = path.join(outputDirectory, "sw.js");
const publicManifest = path.join(publicDirectory, "offline-assets.json");
const notFoundPage = path.join(outputDirectory, "404.html");

const version =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  "local";

const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });

const toPublicUrl = (filePath) => {
  const relativePath = path.relative(outputDirectory, filePath);
  const encodedPath = relativePath
    .split(path.sep)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  const publicUrl = `/${encodedPath}`;

  if (publicUrl === "/index.html") {
    return "/";
  }

  if (publicUrl.endsWith("/index.html")) {
    return publicUrl.slice(0, -"/index.html".length) || "/";
  }

  if (publicUrl.endsWith(".html")) {
    return publicUrl.slice(0, -".html".length);
  }

  return publicUrl;
};

const files = walk(outputDirectory).filter(
  (filePath) =>
    path.resolve(filePath) !== path.resolve(outputManifest) &&
    path.resolve(filePath) !== path.resolve(outputServiceWorker) &&
    path.resolve(filePath) !== path.resolve(notFoundPage)
);

files.sort((left, right) => {
  const leftPath = toPublicUrl(left);
  const rightPath = toPublicUrl(right);
  const priority = (value) =>
    value === "/" ? 0 : value.startsWith("/_next/") ? 1 : 2;

  return priority(leftPath) - priority(rightPath) || leftPath.localeCompare(rightPath);
});

const assets = files.map((filePath) => ({
  url: toPublicUrl(filePath),
  bytes: fs.statSync(filePath).size,
}));

const manifest = {
  version,
  totalBytes: assets.reduce((sum, asset) => sum + asset.bytes, 0),
  totalFiles: assets.length,
  assets,
};
const manifestContents = JSON.stringify(manifest);
const serviceWorkerContents = fs
  .readFileSync(serviceWorkerTemplate, "utf8")
  .replaceAll("__BUILD_VERSION__", version);

fs.writeFileSync(outputManifest, manifestContents);
fs.writeFileSync(publicManifest, manifestContents);
fs.writeFileSync(outputServiceWorker, serviceWorkerContents);
fs.writeFileSync(serviceWorkerTemplate, serviceWorkerContents);

console.log(
  `Prepared ${assets.length} offline assets (${manifest.totalBytes} bytes), version ${version}.`
);
