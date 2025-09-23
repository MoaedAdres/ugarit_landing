import { BASE_URL } from "@/api/config";
import axios from "axios";
export const online = true;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept-Language": localStorage.getItem("lang") ?? "en",
    "is_paginate": false
  },
});


const { get, post, put, patch, delete: destroy } = apiClient;
export { get, post, put, destroy, patch };

export default apiClient;
