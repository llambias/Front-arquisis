import { axiosInstance } from "./axios";

type buyStockRequestInputs = {
  // group_id: number;
  user_id: number;
  quantity: number;
  funds: number;
  symbol: string;
  operation: string;
  token_ws: string;
};

export const buyStockRequest = async (
  stockRequestData: buyStockRequestInputs
) => {
  const group_id = 25;
  const response = await axiosInstance.post("/transactions", {
    ...stockRequestData,
    group_id,
  });
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

type WorkerFilters = {
  price?: number;
  user_id?: number;
  quantity?: number;
  timestamp?: string;
  symbol?: string;
  // page?: number;
  // count?: number;
};

export const getAllWorkersRequest = async (user_id: number) => {
  const count = 150;
  const response = await axiosInstance.get(`/job:${user_id}`);
  return response.data;
};

export const getUserTransactionsRequest = async (user_id: number) => {
  const response = await axiosInstance.get("/transactions", {
    params: { user_id },
  });
  return response.data;
};



export const createTransbankPaymentRequest = async (
  request_id: string,
  amount: number
) => {
  const response = await axiosInstance.post("/transactions/transbank/create", {
    request_id,
    amount,
  });
  return response.data;
};

export const commitTransbankPaymentRequest = async (
  token: string,
  user_id: number
) => {
  const response = await axiosInstance.get("/transactions/transbank/commit", {
    params: { token_ws: token, user_id },
  });
  return response.data;
};
