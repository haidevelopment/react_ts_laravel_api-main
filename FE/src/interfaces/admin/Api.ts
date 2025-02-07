export interface stateProduct {
  id: number | undefined;
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
  id: string;
  value: string;
  attribute_id: number;
}
export interface stateAttribute {
  id: string | undefined;
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
}
export interface attributeValueProduct {
  id: number;
  attribute_id: number;
  value: string;
  created_at: Date;
  updated_at: Date;
}
