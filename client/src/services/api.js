import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const generateStudyMaterial = async (notes) => {
  const response = await API.post("/generate", { notes });
  return response.data;
};