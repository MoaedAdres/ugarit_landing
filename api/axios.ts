import axios from "axios";
export const online = true;

const apiClient = axios.create({
  baseURL: "http://192.168.0.72:8020",
  headers: {
    "Accept-Language": localStorage.getItem("lang") ?? "en",
  },
});


const { get, post, put, patch, delete: destroy } = apiClient;
export { get, post, put, destroy, patch };

export default apiClient;
