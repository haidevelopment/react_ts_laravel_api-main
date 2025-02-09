export interface IFormInput {
  id: number | undefined;
  name: string;
  description: string;
  image: File;
  active: number;
}
export interface productData {
  name: string;
  sku: string;
  price: string;
  description: string;
  quantity_warning: string;
  quantity: string;
  weight: string;
  tags: string;
  category_id: string;
  brand_id: string;
  image: File | null;
  images: File[];
  instructional_images: File | null;
}
export interface ProductDataVariant {
  data:productData,
  variant:VariantDataInterface[]
}
export interface attributeInput {
  name: string;
}
export interface attributeValueInput {
  value: string;
  attribute_id:number
}
export interface InputBrand {
  id: number | undefined;
  name: string;
  image: File;
}
export interface Variant {
  attrId: string;
  attrValueId: string;
  label: string;
}
export interface VariantDataInterface {
  attributes: Variant[];
  price: number;
  sku: string;
  weight: number;
  description: string;
  quantity: number; 
  image: File | null;
  imagePreview?: string | null;
}
export interface InputCart{
  name: string;
  price: number;
  image: string;
  variant_id: number | null;
  quantity: number;
  total: number;
  id_product: number;
  id_user: number;
}
