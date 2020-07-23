"use strict";

var path = require("path");
var pkgDir = require("pkg-dir");
var sh = require("shelljs");
var minimatch = require("minimatch");

// check whether the changed file is in dnt list
function checkChanged(opts = {cached: ~process.argv.indexOf('--cached')}) {
  var changed = listChanged(opts);
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
function listChanged(opts) {
  const cmd = opts.cached ? 'git diff --name-only -r --cached' : 'git diff --name-only -r HEAD origin/master'
  const changed = sh.exec(cmd, {silent: true})

  return changed.split(/\r?\n/).filter(Boolean)
}

// read "do-not-touch" list
function readConfig(opts) {
  var dir = pkgDir.sync(opts.cwd);
  var pkg = require(path.join(dir, "./package.json"));

  return pkg["do-not-touch"] || []
}

module.exports = { checkChanged };
