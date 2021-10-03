import axios from "axios";
import { ApiEndpoint } from "./ApiConnection";
import { Collection } from "./generated-sources";

export const getCollectionNames = async (): Promise<Collection["name"][]> => {
  const storageNames = localStorage.getItem("collectionNames");
  if (storageNames) {
    console.log("Retrieved collection names from local storage");
    return JSON.parse(storageNames);
  }
  console.log("Retrieving collection names from API");
  const response = await axios.get(ApiEndpoint + "collections/names");
  localStorage.setItem("collectionNames", JSON.stringify(response.data.data));
  return response.data.data;
};

export const getCollectionData = async (): Promise<Collection[]> => {
  const storageNames = localStorage.getItem("collectionData");
  if (storageNames) {
    console.log("Retrieved collection data from local storage");
    return JSON.parse(storageNames);
  }
  console.log("Retrieving collection data from API");
  const response = await axios.get(ApiEndpoint + "collections/data");
  localStorage.setItem("collectionData", JSON.stringify(response.data.data));
  return response.data.data;
};
