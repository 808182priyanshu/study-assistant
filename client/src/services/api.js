import axios from "axios";
const API_URL = "https://study-assistant-q9ym.onrender.com/api";

export const generateStudyMaterial = async (notes) => {
  const response = await API.post("/generate", { notes });
  return response.data;
};