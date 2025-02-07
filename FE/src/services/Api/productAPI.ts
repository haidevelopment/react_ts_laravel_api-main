import { productData, ProductDataVariant } from "../../interfaces/admin/Form";
import instance from "../../utils/Requests/instance";

export const getAllProducts = async () => {
  const response = await instance.get("/products");
  return response.data;
};

export const createProducts = async (data: ProductDataVariant) => {
  const response = await instance.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProducts = async (id: number, data: productData) => {
  console.log("api:", id);

  const response = await instance.post(`products/edit/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProducts = async (id: number) => {
  const response = await instance.delete(`products/${id}`);
  return response.data;
};
