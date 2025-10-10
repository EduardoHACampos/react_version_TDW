import axios from "axios";

const httpClient = axios.create({
  // Aponta para o proxy local que configuramos no vite.config.ts
  baseURL: "/api",
});

export default httpClient;
