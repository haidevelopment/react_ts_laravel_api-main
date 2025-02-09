import { quantityCartApi, variantCartApi } from "../../interfaces/admin/Api";
import { InputCart } from "../../interfaces/admin/Form";
import instance from "../../utils/Requests/instance";

const URL = "cart";
export const getAllCart = async () => {
    const response = await instance.get(URL);
    return response.data;
  };
  
  export const createCart = async (data: InputCart) => {
    const response = await instance.post(URL, data);
    return response.data;
  };
  
  export const updateCart = async (data: InputCart) => {
    const response = await instance.post(`${URL}/update`, data);
    return response.data;
  };
  
  export const deleteCart = async (id: number) => {
    const response = await instance.delete(`${URL}/${id}`);
    return response.data;
  };
  export const updateVariantCart = async(data:variantCartApi) =>{
    const res = await instance.post(`${URL}/cart-variant`,data);
    return res.data;
  }
  export const updateQuantityCart = async(data:quantityCartApi) =>{
    const res = await instance.post(`${URL}/cart-quantity`,data);
    return res.data;
  }
  