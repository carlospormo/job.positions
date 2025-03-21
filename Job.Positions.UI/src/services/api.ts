import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5001/api",
});

export const getPositions = async () => {
  const response = await api.get("/positions");
  return response.data;
};

export const createPosition = async (position: {
  positionNumber: string;
  title: string;
  budget: number;
}) => {
  return await api.post("/positions", position);
};

export const updatePosition = async (id: string, position: any) => {
  return await api.put(`/positions/${id}`, position);
};

export const deletePosition = async (id: string) => {
  return await api.delete(`/positions/${id}`);
};
