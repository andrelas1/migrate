"use strict";
exports.__esModule = true;
exports.renameFiles = exports.renameJsToTs = void 0;
var process_1 = require("process");
var glob_1 = require("glob");
var renameJsToTs = function (locations) {
    return locations.map(function (location) { return location.replace(/\.(\w+)/, ".ts"); });
};
exports.renameJsToTs = renameJsToTs;
var renameFiles = function () {
    var pattern;
    process_1.argv.forEach(function (arg) {
        pattern = arg;
    });
    var files = (0, glob_1.sync)(pattern);
    console.log("FILES", files);
};
exports.renameFiles = renameFiles;
