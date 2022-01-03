import { renameSync } from "fs";
import { argv } from "process";
import { sync } from "glob";

type FolderLocation = string;

// type Success = {
//   result: "ok";
// };

// type Failure = {
//   result: "error";
//   error: string;
// };

// type Maybe = Success | Failure;

console.log("RUNNING");

type Rename = (locations: FolderLocation) => string;
type RenameAllFiles = () => void;

export const renameJsToTs: Rename = (location) => {
  return location.replace(/\.(\w+)/, ".ts");
};

export const renameFiles: RenameAllFiles = () => {
  let pattern: string = "";
  const ignore: string[] = [];

  argv.forEach((arg) => {
    if (arg.includes("pattern")) {
      [, pattern] = arg.split("=");
    } else {
      ignore.push(arg);
    }
  });

  console.log("WORKING DIR", process.cwd());
  const files = sync(pattern, {
    ignore,
  });

  console.log("FILES", files);

  for (const file of files) {
    try {
      renameSync(file, renameJsToTs(file));
    } catch (e) {
      console.error(e);
    }
  }
};
