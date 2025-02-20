import { AddressInterface } from "../authInterface";

export interface stateProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  weight: number;
  quantity: number;
  quantity_warning: number;
  tags: string;
  sku: string;
  brand_id: number;
  category_id: number;
  instructional_images: string;
  active: number;
  created_at: Date;
  updated_at: Date;
  category: categoriesState[];
  attachments: attachmentProduct[];
  variant: variantProduct[];
}
interface attributeValue {
  id: number;
  value: string;
  attribute_id: number;
}
export interface stateAttribute {
  id: number;
  name: string;
  attribute_value: attributeValue[];
}
export interface stateBrand {
  id: number;
  name: string;
  image: string;
}
export interface categoriesState {
  id: number | undefined;
  name: string;
  description: string;
  image: string;
  active: number;
}
export interface attachmentProduct {
  id: number;
  product_id: number;
  image_url: string;
}
export interface variantProduct {
  id: number;
  product_id: number;
  sku: string;
  price: number;
  quantity: number;
  weight: number;
  image: string;
  description: string;
  active: 1;
  created_at: Date;
  updated_at: Date;
  variant_attribute_value: variantValue[];
}
export interface variantValue {
  id: number;
  variant_id: number;
  attribute_id: number;
  attribute_value_id: number;
  created_at: Date;
  updated_at: Date;
  attribute_value: attributeValueProduct;
  attribute: attribute;
}
export interface attributeValueProduct {
  id: number;
  attribute_id: number;
  value: string;
  created_at: Date;
  updated_at: Date;
}
interface attribute {
  id: number;
  name: string;
}
export interface variantCartApi {
  id: number;
  variant_id: number;
}
export interface quantityCartApi {
  id: number;
  quantity: number;
}
interface user {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  genre: string;
  birth: string;
  email_verified_at: Date | null;
  max_level_security: number;
  created_at: Date;
  updated_at: Date;
}
export interface stateCart {
  id: number;
  name: string;
  price: number;
  image: string;
  variant_id: number;
  quantity: number;
  total: number;
  id_product: number;
  id_user: number;
  product: stateProduct;
  user: user;
  variant: variantProduct;
}
export interface stateCoupon {
  id: number;
  code: string;
  title: string;
  voucher_type: string;
  value: string;
  discount_type: string;
  min_order_value: number;
  max_discount_value: number;
  start_date: string;
  end_date: string;
  limit: number;
  is_active: number;
}
export interface stateOrder {
  id: number;
  user_id: number;
  code: string;
  address_id: number;
  coupon_id: number;
  total_price: number;
  shipping_fee: number;
  discount_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  note: string;
  created_at: string;
  items: orderItem[];
  address: AddressInterface;
  coupon: stateCoupon;
}
export interface orderItem {
  id: number;
  order_id: number;
  product_id: number;
  variant_id: number;
  price: number;
  quantity: number;
  total_price: number;
  created_at: string;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  variant: variantProduct;
}
export interface Message {
  id: number;
  chat_id: number;
  sender_id: number;
  type: "text" | "image" | "video" | "file";
  messages: string;
  created_at: string;
  updated_at: string;
  user?: Admin;
}
interface Admin {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  genre: "male" | "female" | "other";
  birth: string;
  email_verified_at: string | null;
  max_level_security: number;
  created_at: string;
  updated_at: string;
}
export interface roomAdminApi{
  id:number;
  customer_id:number;
  admin_id:number;
  user:Admin

}