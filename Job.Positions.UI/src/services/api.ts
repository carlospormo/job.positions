import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7087/api",
});

export const getPositions = async () => {
  const response = await api.get("/positions");
  return response.data;
};

export const createPosition = async (position: any) => {
  return await api.post("/positions", position);
};

export const updatePosition = async (id: number, position: any) => {
  return await api.put(`/positions/${id}`, position);
};

export const deletePosition = async (id: number) => {
  return await api.delete(`/positions/${id}`);
};
