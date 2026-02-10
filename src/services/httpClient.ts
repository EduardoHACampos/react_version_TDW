import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://tdwbackend1-production.up.railway.app",
});

export default httpClient;
