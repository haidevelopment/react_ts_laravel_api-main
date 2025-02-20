import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../interfaces/admin/Store";
import {
  createCart,
  deleteCart,
  getAllCart,
  updateCart,
  updateQuantityCart,
  updateVariantCart,
} from "../../services/Api/CartAPI";
import { InputCart } from "../../interfaces/admin/Form";
import { ToastError, ToastSucess } from "../../utils/toast";
import { quantityCartApi, variantCartApi } from "../../interfaces/admin/Api";

const initialState: CartState = {
  cart: [],
  status: "idle",
};
export const getCart = createAsyncThunk("cart/getCart", async () => {
  return await getAllCart();
});
export const addCarts = createAsyncThunk(
  "cart/addCart",
  async (data: InputCart) => {
    return await createCart(data);
  }
);
export const editCart = createAsyncThunk(
  "cart/updateCart",
  async (data: InputCart) => {
    return await updateCart(data);
  }
);
export const removeCart = createAsyncThunk(
  "cart/deleteCart",
  async (id: number) => {
    return await deleteCart(id);
  }
);
export const editVariantCart = createAsyncThunk(
  "cart/editVariant",
  async (data: variantCartApi) => {
    return await updateVariantCart(data);
  }
);
export const editQuantityCart = createAsyncThunk(
  "cart/editQuantityCart",
  async (data: quantityCartApi) => {
    return await updateQuantityCart(data);
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builer) =>
    builer
      .addCase(getCart.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart = action.payload;
        }
        state.status = "idle";
      })
      .addCase(addCarts.fulfilled, (state, action) => {
        if (state.cart) {
          if (action.payload.type == "create") {
            state.cart.push(action.payload.data);
            state.status = "idle";
            ToastSucess(action.payload.message);
          } else if (action.payload.type == "update") {
            const index = state.cart.findIndex(
              (c) => c?.id == action.payload.data.id
            );
            if (index) {
              state.cart[index] = action.payload.data;
            }
            state.status = "idle";

            ToastSucess(action.payload.message);
          } else {
            ToastError(action.payload.message);
            state.status = "failed";
          }
        }
      })
      .addCase(editCart.fulfilled, (state, action) => {
        if (state.cart) {
          const index = state.cart.findIndex((c) => c?.id == action.payload.id);
          if (index) {
            state.cart[index] = action.payload;
          }
        }
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart = state.cart.filter((c) => c?.id != action.payload.id);
        }
        ToastSucess("Xoá sản phẩm thành công !");
        state.status = "idle";
      })
      .addCase(editVariantCart.fulfilled, (state, action) => {
        if (state.cart) {
          if (action.payload.status === "error") {
            ToastError(action.payload.message);
            state.status = "failed";
          } else {
            const index = state.cart.findIndex(
              (c) => c?.id == action.payload.data.id
            );
            if (index !== -1) {
              state.cart[index] = action.payload.data;
            }
            state.status = "idle";
            ToastSucess(action.payload.message);
          }
        }
      })

      .addCase(editQuantityCart.fulfilled, (state, action) => {
        if (state.cart) {
          if (action.payload.status == "error") {
            ToastError(action.payload.message);
            state.status = "failed";
          } else {
            const index = state.cart.findIndex(
              (c) => c?.id == action.payload.data.id
            );
            if (index) {
              state.cart[index] = action.payload.data;
            }
            state.status = "idle";
            ToastSucess(action.payload.message);
          }
        }
      }),
});
export default cartSlice.reducer;
