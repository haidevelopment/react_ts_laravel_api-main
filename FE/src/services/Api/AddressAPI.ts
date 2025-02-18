import { AddressData } from "../../interfaces/admin/Form";
import instance from "../../utils/Requests/instance";
const URL = "address";
export const createAddress = async (data: AddressData) => {
  const response = await instance.post(URL, data);
  return response.data;
};
