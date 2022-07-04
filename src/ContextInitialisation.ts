import axios from "axios";
import { Collection } from "./generated-sources";
import { API } from "./Api";

export const getCollectionNames = async (): Promise<Collection["name"][]> => {
  const storageNames = localStorage.getItem("collectionNames");
  // if (storageNames) {
  //   return JSON.parse(storageNames);
  // }
  const response = await API.getCollectionNamesCollectionsNamesGet();
  const ResponseCollectionsName = response.data;
  localStorage.setItem(
    "collectionNames",
    JSON.stringify(ResponseCollectionsName.data)
  );
  return ResponseCollectionsName.data;
};

export const getCollectionData = async (): Promise<Collection[]> => {
  const storageNames = localStorage.getItem("collectionData");
  // if (storageNames) {
  // }
  const response = await API.getCollectionDataCollectionsDataGet();
  localStorage.setItem("collectionData", JSON.stringify(response.data.data));
  return response.data.data;
};
