import { categoriesState, stateAttribute, stateBrand, stateProduct } from "./Api";

export interface CategoryState {
  categories: {
    original: categoriesState[];
    headers: object;
    exception: string | null;
  } | null;
  status: "idle" | "loading" | "failed";
}
export interface ProductState {
  products: stateProduct[];

  status: "idle" | "loading" | "failed";
}
export interface AttributeState {
  attribute: stateAttribute[];
  status: "idle" | "loading" | "failed";
}
export interface BrandState {
  brand: stateBrand[];
  status: "idle" | "loading" | "failed";
}
