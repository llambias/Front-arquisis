import { axiosInstance, authInstance } from "./axios";

const API_URL = import.meta.env.VITE_API_URL;

type buyStockRequestInputs = {
  // group_id: number;
  user_id: number;
  quantity: number;
  funds: number;
  symbol: string;
  operation: string;
};

export const buyStockRequest = async (
  stockRequestData: buyStockRequestInputs
) => {
  const group_id = 25;
  const response = await axiosInstance.post("/transactions", {
    ...stockRequestData,
    group_id,
  });
  console.log("BUY STOCK RESPONSE");
  console.log(response);
  return response.data;
};

type stockFilters = {
  price?: number;
  quantity?: number;
  timestamp?: string;
  // page?: number;
  // count?: number;
};

export const getAllStocksRequest = async (filters: stockFilters) => {
  const count = 150;
  const response = await axiosInstance.get("/stocks", {
    params: { ...filters, count },
  });
  return response.data;
};

export const getUserTransactionsRequest = async (user_id: number) => {
  const response = await axiosInstance.get("/transactions", {
    params: { user_id },
  });
  return response.data;
};
