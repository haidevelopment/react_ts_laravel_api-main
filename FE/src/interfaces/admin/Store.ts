import {
  categoriesState,
  stateAttribute,
  stateBrand,
  stateCart,
  stateCoupon,
  stateOrder,
  stateProduct,
} from "./Api";

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
export interface CartState {
  cart: stateCart[];
  status: "idle" | "loading" | "failed";
}
export interface CouponState {
  coupon: stateCoupon[];
  status: "idle" | "loading" | "failed";
}
export interface OrderState {
  client: stateOrder[];
  admin: stateOrder[];
  status: "idle" | "loading" | "failed";
}
