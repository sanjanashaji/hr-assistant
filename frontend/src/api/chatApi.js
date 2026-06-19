import axios from "axios";
import { API_BASE } from "../config/api";

const API = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessage = async (question) => {
  const response = await API.post("/chat", {
    question,
  });

  return response.data;
};
