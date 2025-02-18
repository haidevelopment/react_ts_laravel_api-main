import { orderData } from "../../interfaces/admin/Form";
import instance from "../../utils/Requests/instance";

const URL = "order";

export const getAllOrderClient = async () => {
  const response = await instance.get(URL);
  return response.data;
};
export const createOrderService = async (data: orderData) => {
  const response = await instance.post(URL, data);
  return response.data;
};
export const updateOrderStatus = async (data: {
  id: number;
  order_status: string;
}) => {
  const response = await instance.put(URL, data);
  return response.data;
};
