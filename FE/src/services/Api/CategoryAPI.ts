import { IFormInput } from "../../interfaces/admin/Form";
import instance from "../../utils/Requests/instance";

export const getAllCategories = async () => {
  const response = await instance.get("/category");
  return response.data;
};

export const createCategory = async (data: IFormInput) => {
  const response = await instance.post("/category", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateCategory = async (id: number, data: IFormInput) => {
  console.log('api:',id);
  
  const response = await instance.post(`category/edit/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await instance.delete(`category/${id}`);
  return response.data;
};
