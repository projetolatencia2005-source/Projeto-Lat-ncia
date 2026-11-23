const fs = require("node:fs");
const path = require("node:path");

const serviceWorkerPath = path.join(process.cwd(), "public", "sw.js");
const version =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  "local";
const template = fs.readFileSync(serviceWorkerPath, "utf8");

fs.writeFileSync(
  serviceWorkerPath,
  template.replaceAll("__BUILD_VERSION__", version)
);

console.log(`Prepared service worker version ${version}.`);
