var sh = require("shelljs")


var files = sh.exec('git diff --name-only HEAD origin/master')
console.log(files)
