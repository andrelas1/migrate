import { sync } from "glob";

import { renameFiles, renameJsToTs } from "./flow-ts";

jest.mock("glob", () => ({
  esModule: true,
  default: jest.fn(),
  sync: jest.fn(),
}));

jest.mock("process", () => ({
  esModule: true,
  argv: ["pattern=**/*.js"],
}));

describe("flow to ts", () => {
  describe("renameJsToTs", () => {
    it("should be a function", () => {
      expect(typeof renameJsToTs).toEqual("function");
    });

    it("should return the filename extension changed to ts", () => {
      const filenames = ["src/a/file.js", "somefile.js", "src/somefile.js"];

      const expectedResult = [
        "src/a/file.ts",
        "somefile.ts",
        "src/somefile.ts",
      ];

      expect(renameJsToTs(filenames)).toEqual(expectedResult);
    });
  });

  describe("renameFiles", () => {
    it("should be a function", () => {
      expect(typeof renameFiles).toEqual("function");
    });

    it("should call glob to get all files with the correct pattern", () => {
      renameFiles();

      expect(sync).toHaveBeenCalledWith("**/*.js");
    });
  });
});
