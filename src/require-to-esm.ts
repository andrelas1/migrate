export function requireToEsm(content: string) {
  const importNameR = /(?<=(const|var|let)\s)\w+(?=\s\=\srequire)/g;
  const importPathR = /(?<=require\(\'|\").+(?=(\'|\")\))/g;
  const requireLineR =
    /((const|var|let)\s)\w+(\s\=\srequire\(('|")(?:\.\/)?.*(\'|\")\))/g;

  const matchedImportNames = Array.from(content.matchAll(importNameR)).map(
    (arr) => arr[0]
  );
  const matchedImportPaths = Array.from(content.matchAll(importPathR)).map(
    (arr) => arr[0]
  );
  const matchedRequireLines = Array.from(content.matchAll(requireLineR)).map(
    (arr) => arr[0]
  );

  return matchedRequireLines.reduce((acc, val, index) => {
    return acc.replace(
      val,
      importStatementsFromRequire(
        matchedImportNames[index],
        matchedImportPaths[index]
      )
    );
  }, content);
}

type ImportStatementsFromRequire = (
  importName: string,
  importPath: string
) => string;

const importStatementsFromRequire: ImportStatementsFromRequire = (
  name,
  path
) => {
  return `import ${name} from '${path}'`;
};
