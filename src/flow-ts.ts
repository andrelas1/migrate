import { argv } from "process";
import { sync } from "glob";

type FolderLocation = string;

type Success = {
  result: "ok";
};

type Failure = {
  result: "error";
  error: string;
};

type Maybe = Success | Failure;

type Rename = (locations: FolderLocation[]) => string[];
type RenameAllFiles = () => void;

export const renameJsToTs: Rename = (locations) => {
  return locations.map((location) => location.replace(/\.(\w+)/, ".ts"));
};

export const renameFiles: RenameAllFiles = () => {
  let pattern: string = "";

  argv.forEach((arg) => {
    pattern = arg;
  });

  const files = sync(pattern);

  console.log("FILES", files);
};
