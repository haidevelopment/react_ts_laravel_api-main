import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CouponState } from "../../interfaces/admin/Store";
import { createCoupon, deleteCoupon, getAllCoupon, updateCoupon } from "../../services/Api/CouponAPI";
import { CouponInput } from "../../interfaces/admin/Form";
import { ToastSucess } from "../../utils/toast";


const initialState: CouponState = {
  coupon: [],
  status: "idle",
};
export const getCoupon = createAsyncThunk("coupon/getALLCoupon", async () => {
  return await getAllCoupon();
});
export const addCoupon = createAsyncThunk(
  "coupon/addCoupon",
  async (data: CouponInput) => {
    return await createCoupon(data);
  }
);
export const editCoupon = createAsyncThunk(
  "coupon/editCoupon",
  async ({ data, id }: { data: CouponInput; id: number }) => {
    return await updateCoupon(id, data);
  }
);
export const destroyCoupon = createAsyncThunk(
  "coupon/destroyCoupon",
  async (id: number) => {
    return await deleteCoupon(id);
  }
);
export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(getCoupon.fulfilled, (state, action) => {
        if (state.coupon) {
          state.coupon = action.payload;
        }
        state.status = "idle";
      })
      .addCase(addCoupon.fulfilled, (state, action) => {
        if (action.payload && state.coupon) {
          state.coupon.push(action.payload);
          console.log(action.payload);
          
          ToastSucess("Thêm Mã Giảm Giá Thành Công");
        }
        state.status = "idle";
      })
      .addCase(editCoupon.fulfilled, (state, action) => {
        if (state.coupon) {
          const index = state.coupon.findIndex((b) => b.id == action.payload.id);
          if (index != -1) {
            state.coupon[index] = action.payload;
          }
          ToastSucess("Sửa Mã Giảm Giá Thành Công");

        }
        state.status = "idle";
      })
      .addCase(destroyCoupon.fulfilled, (state, action) => {
        if (state.coupon) {
          state.coupon = state.coupon.filter((b) => b.id != action.payload.id);
        }
        state.status = "idle"
      });
  },
});
export default couponSlice.reducer;
