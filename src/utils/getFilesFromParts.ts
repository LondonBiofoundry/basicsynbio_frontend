import { BasicAssembly, BasicPart } from "../generated-sources";

export const returnFileFromJsonPart = (jsonPart: BasicPart) => {
  if (jsonPart.file) {
    return jsonPart.file;
  } else {
    return null;
  }
};

export const returnFileFromJsonParts = (jsonParts: Array<BasicPart>) => {
  const files: Array<any> = [];
  if (!jsonParts) {
    return [];
  }
  for (const jsonPart of jsonParts) {
    const file = returnFileFromJsonPart(jsonPart);
    if (file !== null) {
      files.push(file);
    }
  }
  return files;
};

export const returnFilesFromJsonAssembly = (jsonAssembly: BasicAssembly) => {
  const files: Array<any> = [];
  if (!jsonAssembly.parts) {
    return [];
  }
  for (const jsonPart of jsonAssembly.parts) {
    const file = returnFileFromJsonPart(jsonPart);
    if (file !== null) {
      files.push(file);
    }
  }
  return files;
};

export const returnFilesFromJsonAssemblyArray = (
  jsonAssemblies: Array<BasicAssembly>
) => {
  const files: Array<any> = [];
  for (const jsonAssembly of jsonAssemblies) {
    if (!jsonAssembly.parts) {
      return [];
    }
    for (const jsonPart of jsonAssembly.parts) {
      const file = returnFileFromJsonPart(jsonPart);
      if (file !== null) {
        files.push(file);
      }
    }
  }
  return files;
};
