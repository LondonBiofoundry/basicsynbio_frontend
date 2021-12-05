// To work with the hosted production backend, leave the first line uncommented
// TO work with a local instance of the backend, uncomment the second line

import {
  Configuration,
  ConfigurationParameters,
  DefaultApiFactory,
} from "./generated-sources";
import axios from "axios";

// export const ApiEndpoint = "http://127.0.0.1:8000/";
export const ApiEndpoint = "https://basic-syn-bio.herokuapp.com/";

const ConfigParams: ConfigurationParameters = {
  basePath: ApiEndpoint.slice(0, -1),
};

const Config = new Configuration(ConfigParams);

export const API = DefaultApiFactory(Config);
