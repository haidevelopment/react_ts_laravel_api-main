import {
  attributeInput,
  attributeValueInput,
} from "../../interfaces/admin/Form";
import instance from "../../utils/Requests/instance";
const URL = "attributes";
export const getDataAttribute = async () => {
  const response = await instance.get(URL);
  return response.data;
};
export const createAttribute = async (data: attributeInput) => {
  const response = await instance.post(URL, data);
  return response.data;
};
export const updateAttribute = async (id: number, data: attributeInput) => {
  const response = await instance.post(`${URL}/edit/${id}`, data);
  return response.data;
};
export const getOneAttribute = async (id: number) => {
  const res = await instance.get(`${URL}/${id}`);
  return res.data;
};

export const deleteAttribute = async (id: number) => {
  const response = await instance.delete(`${URL}/${id}`);
  return response.data;
};
export const createAttributevalue = async (data: attributeValueInput) => {
  const res = await instance.post(`${URL}/value`, data);
  return res.data;
};
export const updateAttributevalue = async (
  id: number,
  data: attributeValueInput
) => {
  const res = await instance.put(`${URL}/value/${id}`, data);
  return res.data;
};
export const deleteAttributevalue = async (id: number) => {
  const res = await instance.delete(`${URL}/value/${id}`);
  return res.data;
};
