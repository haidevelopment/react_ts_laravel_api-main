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
  data: productData;
  variant: VariantDataInterface[];
}
export interface attributeInput {
  name: string;
}
export interface attributeValueInput {
  value: string;
  attribute_id: number;
}
export interface InputBrand {
  id: number | undefined;
  name: string;
  image: File;
}
export interface CouponInput {
  code: string;
  title: string;
  voucher_type: string;
  value: number;
  discount_type: string;
  min_order_value: number;
  max_discount_value: number;
  start_date: string;
  end_date: string;
  limit: number;
  is_active: number;
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
export interface AddressData {
  full_name: string;
  email: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  note?: string;
}
export interface apiRequestLocal {
  code:string;
  name:string;
}
export interface InputCart {
  name: string;
  price: number;
  image: string;
  variant_id: number | null;
  quantity: number;
  total: number;
  id_product: number;
  id_user: number;
}
export interface orderData {
  total_price:number;
  payment_method:string;
  address_id:number | null;
  coupon_id:number | null | undefined;

}