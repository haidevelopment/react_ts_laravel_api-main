import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
} from "../../services/Api/BrandAPI";
import { BrandState } from "../../interfaces/admin/Store";
import { InputBrand } from "../../interfaces/admin/Form";

const initialState: BrandState = {
  brand: [],
  status: "idle",
};
export const getBrand = createAsyncThunk("brand/getALLBrand", async () => {
  return await getAllBrands();
});
export const addBrand = createAsyncThunk(
  "brand/addBrand",
  async (data: InputBrand) => {
    return await createBrand(data);
  }
);
export const editBrand = createAsyncThunk(
  "brand/editBrand",
  async ({ data, id }: { data: InputBrand; id: number }) => {
    return await updateBrand(id, data);
  }
);
export const destroyBrand = createAsyncThunk(
  "brand/destroyBrand",
  async (id: number) => {
    return await deleteBrand(id);
  }
);
export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(getBrand.fulfilled, (state, action) => {
        if (state.brand) {
          state.brand = action.payload;
        }
        state.status = "idle";
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        if (action.payload && state.brand) {
          state.brand.push(action.payload);
        }
        state.status = "idle";
      })
      .addCase(editBrand.fulfilled, (state, action) => {
        if (state.brand) {
          const index = state.brand.findIndex((b) => b.id == action.payload.id);
          if (index != -1) {
            state.brand[index] = action.payload;
          }
        }
        state.status = "idle";
      })
      .addCase(destroyBrand.fulfilled, (state, action) => {
        if (state.brand) {
          state.brand = state.brand.filter((b) => b.id != action.payload.id);
        }
        state.status = "idle"
      });
  },
});
export default brandSlice.reducer;
