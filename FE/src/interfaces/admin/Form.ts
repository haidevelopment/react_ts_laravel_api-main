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
  image: File | null;
  images: File[];
}
