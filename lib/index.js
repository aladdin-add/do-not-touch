"use strict";

var fs = require("fs");
var path = require("path");
var pkgDir = require("pkg-dir");
var sh = require("shelljs");
var minimatch = require("minimatch");

var changed = listChanged();
var dnt = readConfig();

changed.forEach((ch) => {
  dnt.forEach((file) => {
    if (minimatch(ch, file)) {
      console.error(`🚨please do not touch "${ch}".`);
      process.exit(1);
    }
  });
});

// get changed files
function listChanged() {
  var changedFiles = sh.exec("git diff --name-only -r HEAD origin/master", {
    silent: true,
  });
  return changedFiles.split(/\r?\n/).filter(Boolean);
}

// read "do-not-touch" list
function readConfig(opts = {}) {
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
