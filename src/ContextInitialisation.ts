import axios from "axios";
import { Collection } from "./generated-sources";
import { API } from "./Api";

export const getCollectionNames = async (): Promise<Collection["name"][]> => {
  const storageNames = localStorage.getItem("collectionNames");
  // if (storageNames) {
  //   console.log("Retrieved collection names from local storage");
  //   return JSON.parse(storageNames);
  // }
  console.log("Retrieving collection names from API");
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
  //   console.log("Retrieved collection data from local storage");
  //   return JSON.parse(storageNames);
  // }
  console.log("Retrieving collection data from API");
  const response = await API.getCollectionDataCollectionsDataGet();
  localStorage.setItem("collectionData", JSON.stringify(response.data.data));
  return response.data.data;
};
