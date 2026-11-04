const { readdirSync, readFileSync, statSync, writeFileSync } = require("fs");
const { minify } = require("terser");
const { extname, join } = require("path");

const OUT_PATH = "out";
const MINIFY_CONCURRENCY = 2;

const JS_MINIFIER_CONFIG = {
  compress: true,
  ecma: 2020,
  mangle: true,
  output: {
    comments: false,
  },
  sourceMap: false,
};

const workerRegEx =
  /new Worker\(\w+\.\w+\(new URL\(\w+\.\w+\+\w+\.\w+\(\d+\),\w+\.\w+\)\),\{name:"([\w\s]+)"\}\)/;

const inlineIndexWorkers = (code) => {
  const [, workerName] = code.match(workerRegEx) || [];

  if (workerName) {
    const workerFilename = readdirSync(
      join(OUT_PATH, "_next/static/chunks")
    ).find((entry) => entry.startsWith(`${workerName}.`));

    if (!workerFilename) {
      throw new Error(`Worker file not found for '${workerName}'`);
    }

    const workerSource = readFileSync(
      join(OUT_PATH, "_next/static/chunks", workerFilename)
    );

    return code.replace(
      workerRegEx,
      () =>
        `new Worker(URL.createObjectURL(new Blob([${JSON.stringify(
          workerSource.toString()
        )}],{type:"text/javascript"})),{name:"${workerName}"})`
    );
  }

  return code;
};

const collectJsFiles = (path, files = []) => {
  readdirSync(path).forEach((entry) => {
    const fullPath = join(path, entry);

    if (statSync(fullPath).isDirectory()) {
      collectJsFiles(fullPath, files);
    } else if (extname(entry).toLowerCase() === ".js") {
      files.push(fullPath);
    }
  });

  return files;
};

const minifyJsFile = async (fullPath) => {
  const js = readFileSync(fullPath);
  let { code: minifiedJs, error } = await minify(
    js.toString(),
    JS_MINIFIER_CONFIG
  );

  if (!error && minifiedJs?.length > 0) {
    if (fullPath.split(/[\\/]/).pop().startsWith("index-")) {
      const changedCode = inlineIndexWorkers(minifiedJs);

      if (minifiedJs === changedCode) {
        throw new Error("Inlining worker failed!");
      }

      minifiedJs = changedCode;
    }

    writeFileSync(fullPath, minifiedJs);
  }
};

const minifyJsFiles = async () => {
  const files = collectJsFiles(OUT_PATH);

  for (let index = 0; index < files.length; index += MINIFY_CONCURRENCY) {
    await Promise.all(
      files.slice(index, index + MINIFY_CONCURRENCY).map(minifyJsFile)
    );
  }
};

minifyJsFiles().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
