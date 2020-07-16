import axios from "axios";
const instance = axios.create({
  baseURL: `http://${process.env.baseUrl || "0.0.0.0"}:${process.env.PORT ||
    3000}`,
  timeout: 20000,
  headers: {}
});

export default instance;
