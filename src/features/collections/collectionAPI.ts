import axios from "axios";
import { ApiEndpoint } from "../../ApiConnection";
import { Collection } from "../../generated-sources";

// A function to return the collections from the API
export async function retriveCollections(): Promise<Collection[]> {
  const response = await axios.get(ApiEndpoint + "collections/names");
  return response.data;
}
