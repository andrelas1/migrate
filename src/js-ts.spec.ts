import { renameSync } from "fs";
import { sync } from "glob";

import { renameFiles, renameJsToTs } from "./js-to-ts";

jest.mock("glob", () => ({
  esModule: true,
  default: jest.fn(),
  sync: jest.fn(),
}));

jest.mock("process", () => ({
  esModule: true,
  argv: ["pattern=**/*.js", "**/node_modules/**", "npm"],
}));

jest.mock("fs", () => ({
  esModule: true,
  renameSync: jest.fn(),
}));

describe("flow to ts", () => {
  describe("renameJsToTs", () => {
    it("should be a function", () => {
      expect(typeof renameJsToTs).toEqual("function");
    });

    it("should return the filename extension changed to ts", () => {
      const filename = "src/a/file.js";

      const expectedResult = "src/a/file.ts";

      expect(renameJsToTs(filename)).toEqual(expectedResult);
    });
  });

  describe("renameFiles", () => {
    const mockData = ["src/a/file.js", "src/file.js", "file.js"];

    beforeEach(() => {
      (sync as jest.MockedFunction<typeof sync>).mockReturnValueOnce([
        ...mockData,
      ]);
    });

    it("should be a function", () => {
      expect(typeof renameFiles).toEqual("function");
    });

    it("should call glob to get all files with the correct pattern", () => {
      renameFiles();

      expect(sync).toHaveBeenCalledWith("**/*.js", {
        ignore: ["**/node_modules/**", "npm"],
      });
    });

    it("calls fs.rename with old and new path", () => {
      renameFiles();

      expect(renameSync).toHaveBeenCalledWith("src/a/file.js", "src/a/file.ts");
      expect(renameSync).toHaveBeenCalledWith("src/file.js", "src/file.ts");
      expect(renameSync).toHaveBeenCalledWith("file.js", "file.ts");
    });
  });
});
