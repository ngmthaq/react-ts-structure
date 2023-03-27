"use strict";

let fs = require("fs");
let pkg = require("./package.json");
let manifest = require("./public/manifest.json");
let [main, stage, test, dev] = pkg.version.split(".");
let variants = ["main", "stage", "test", "dev"];
let argv = process.argv[2] || null;
let variant = variants.includes(argv) ? argv : null;

if (variant) {
  if (variant === "main") {
    main = parseInt(main);
    main = main + 1;
  } else if (variant === "stage") {
    stage = parseInt(stage);
    stage = stage + 1;
  } else if (variant === "test") {
    test = parseInt(test);
    test = test + 1;
  } else {
    dev = parseInt(dev);
    dev = dev + 1;
  }
  let newVersion = `${main}.${stage}.${test}.${dev}`;
  let newPkg = { ...pkg, version: newVersion };
  let newManifest = { ...manifest, start_url: "/?v=" + newVersion };
  fs.writeFileSync("./package.json", JSON.stringify(newPkg));
  fs.writeFileSync("./public/manifest.json", JSON.stringify(newManifest));
}
