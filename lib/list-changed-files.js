var sh = require("shelljs")


var changedFiles = sh.exec('git diff --name-only HEAD origin/master')

var files = changedFiles.split(/\r?\n/)

console.log(files)