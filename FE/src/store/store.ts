import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../Features/Slices/categorySlice";
import productReducer from "../Features/Slices/productSlice";
import attributeReducer from "../Features/Slices/attributeSlice";
import brandReducer from "../Features/Slices/brandSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    attribute: attributeReducer,
    brand: brandReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
