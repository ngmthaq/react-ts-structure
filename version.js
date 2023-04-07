"use strict";

let fs = require("fs");
let pkg = require("./package.json");
let manifest = require("./public/manifest.json");
let [major, minor, build, revision] = pkg.version.split(".");
let variants = ["major", "minor", "build", "revision"];
let argv = process.argv[2] || null;
let variant = variants.includes(argv) ? argv : null;

if (variant) {
  if (variant === "major") {
    major = parseInt(major);
    major = major + 1;
  } else if (variant === "minor") {
    minor = parseInt(minor);
    minor = minor + 1;
  } else if (variant === "build") {
    build = parseInt(build);
    build = build + 1;
  } else {
    revision = parseInt(revision);
    revision = revision + 1;
  }
  let newVersion = `${major}.${minor}.${build}.${revision}`;
  let newPkg = { ...pkg, version: newVersion };
  let newManifest = {
    ...manifest,
    start_url: "/?v=" + newVersion,
    version: newVersion,
    version_name: newVersion,
  };
  fs.writeFileSync("./package.json", JSON.stringify(newPkg));
  fs.writeFileSync("./public/manifest.json", JSON.stringify(newManifest));
  fs.writeFileSync("./public/version.json", JSON.stringify({ version: newVersion }), { flag: "w" });
} else {
  console.log("\n> Please provide version variant: 'major', 'minor', 'build', 'revision'.");
}
