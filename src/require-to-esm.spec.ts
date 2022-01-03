import { requireToEsm } from "./require-to-esm";

describe("requireToEsm", () => {
  it("should be a function", () => {
    expect(typeof requireToEsm).toEqual("function");
  });

  it("should replace require default imports for esm default imports", () => {
    const fileContent = `
      const module = require("./module");

      some code
    `;
    const expectedFileContent = `
      import module from './module';

      some code
    `;

    expect(requireToEsm(fileContent)).toEqual(expectedFileContent);
  });

  it("should replace require default imports for esm default imports", () => {
    const fileContent = `
      const module = require("module");

      some code
    `;
    const expectedFileContent = `
      import module from 'module';

      some code
    `;

    expect(requireToEsm(fileContent)).toEqual(expectedFileContent);
  });

  it("should replace require default imports for esm default imports with dash", () => {
    const fileContent = `
      const module = require("module-a");

      some code
    `;

    const expectedFileContent = `
      import module from 'module-a';

      some code
    `;

    expect(requireToEsm(fileContent)).toEqual(expectedFileContent);
  });

  it("should replace require default imports for esm default imports with @", () => {
    const fileContent = `
      const module = require("@module");

      some code
    `;

    const expectedFileContent = `
      import module from '@module';

      some code
    `;

    expect(requireToEsm(fileContent)).toEqual(expectedFileContent);
  });

  it("should replace all commonjs for esm imports", () => {
    const fileContent = `
      const module = require("@module");
      const module = require("module");
      const module = require("./module");
      const module = require("module-a");

      some code
    `;

    const expectedFileContent = `
      import module from '@module';
      import module from 'module';
      import module from './module';
      import module from 'module-a';

      some code
    `;

    expect(requireToEsm(fileContent)).toEqual(expectedFileContent);
  });
});
