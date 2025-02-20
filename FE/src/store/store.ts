import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../Features/Slices/categorySlice";
import productReducer from "../Features/Slices/productSlice";
import attributeReducer from "../Features/Slices/attributeSlice";
import brandReducer from "../Features/Slices/brandSlice";
import cartReducer from "../Features/Slices/cartSlice";
import couponReducer from "../Features/Slices/couponSlice";
import userReducer from "../Features/Slices/authSlice";
import orderReducer from "../Features/Slices/orderSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    attribute: attributeReducer,
    brand: brandReducer,
    cart: cartReducer,
    coupon: couponReducer, 
    user:userReducer,
    order:orderReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
