import { CouponInput } from "../../interfaces/admin/Form";
import instance from "../../utils/Requests/instance";

const URL ="coupon";
export const getAllCoupon = async () => {
    const response = await instance.get(URL);
    return response.data;
  };
  
  export const createCoupon = async (data: CouponInput) => {
    const response = await instance.post(URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };
  
  export const updateCoupon = async (id: number, data: CouponInput) => {
    const response = await instance.post(`${URL}/edit/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };
  
  export const deleteCoupon = async (id: number) => {
    const response = await instance.delete(`${URL}/${id}`);
    return response.data;
  };
  