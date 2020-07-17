"use strict";

var fs = require("fs");
var path = require("path");
var pkgDir = require("pkg-dir");
var sh = require("shelljs");
var minimatch = require("minimatch");

// check whether the changed file is in dnt list
function checkChanged(opts = {}) {
  var changed = listChanged();
  var dnt = readConfig(opts);

  changed.forEach((ch) => {
    dnt.forEach((file) => {
      if (minimatch(ch, file)) {
        console.error(`🚨please do not touch "${ch}".`);
        process.exitCode = 1;
      }
    });
  });
}

// get changed files
function listChanged() {
  const opts = {silent: true}
  var cachedFiles = sh.exec('git diff --name-only -r --cached', opts)
  var changedFiles = sh.exec("git diff --name-only -r HEAD origin/master", opts);

  return [].concat(
    cachedFiles.split(/\r?\n/).filter(Boolean),
    changedFiles.split(/\r?\n/).filter(Boolean)
  )
}

// read "do-not-touch" list
function readConfig(opts) {
  var dir = pkgDir.sync(opts.cwd);
  var pkg = require(path.join(dir, "./package.json"));

  if (pkg["do-not-touch"]) {
    return pkg["do-not-touch"];
  } else {
    var configPath = path.join(pkgDir, "do-not-touch");
    var content = fs.readFileSync(configPath, "utf-8");
    return content
      .split(/\r?\n/)
      .map((it) => it.trim())
      .filter(Boolean);
  }
}

module.exports = { checkChanged };
