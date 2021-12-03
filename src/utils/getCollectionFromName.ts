import { Collection } from "../generated-sources";

export const getCollectionFromName = (
  name: Collection["name"],
  collections: Collection[]
) => {
  console.log("name", name);
  console.log("collections", collections);
  const collection = collections.filter(
    (collection) => collection.name === name
  )[0];
  console.log("collection", collection);
  return collection;
};

export const getVersionedCollectionFromName = (
  name: Collection["name"],
  returnVersion: string,
  collections: Collection[]
) => {
  const collection = collections.filter(
    (collection) => collection.name === name
  )[0];
  const versionedCollection = collection.versions.filter(
    (version) => version.name === returnVersion
  )[0];
  return versionedCollection;
};
