import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../interfaces/admin/Store";
import {
  createProducts,
  deleteProducts,
  getAllProducts,
  updateProducts,
} from "../../services/Api/productAPI";
import { productData, ProductDataVariant } from "../../interfaces/admin/Form";

const initialState: ProductState = {
  products: [],
  status: "idle",
};
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    return await getAllProducts();
  }
);
export const addProducts = createAsyncThunk(
  "products/createProducts",
  async (data: ProductDataVariant) => {
    return await createProducts(data);
  }
);
export const editProduct = createAsyncThunk(
  "products/updateProducts",
  async ({ id, data }: { id: number; data: productData }) => {
    return await updateProducts(id, data);
  }
);
export const removeProduct = createAsyncThunk(
  "products/deleteProducts",
  async (id: number) => {
    return await deleteProducts(id);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        // console.log(action.payload);
        
        if (state.products) {
          state.products = action.payload;
        }
        state.status = "idle";
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.products?.push(action.payload);
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        if (state.products) {
          state.products = state.products.filter(
            (p) => p.id != action.payload.id
          );
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          console.log("Pending");
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.status = "failed";
          console.log("rejected :");
        }
      );
  },
});
export default productSlice.reducer;
