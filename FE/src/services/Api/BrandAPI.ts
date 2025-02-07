import { InputBrand } from "../../interfaces/admin/Form";
import instance from "../../utils/Requests/instance";

const URL = "brands";
export const getAllBrands = async () => {
  const response = await instance.get(URL);
  return response.data;
};

export const createBrand = async (data: InputBrand) => {
  const response = await instance.post(URL, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateBrand = async (id: number, data: InputBrand) => {
  const response = await instance.post(`${URL}/edit/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteBrand = async (id: number) => {
  const response = await instance.delete(`${URL}/${id}`);
  return response.data;
};
