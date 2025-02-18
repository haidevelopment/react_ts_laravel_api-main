import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderState } from "../../interfaces/admin/Store";
import {
  createOrderService,
  getAllOrderClient,
  updateOrderStatus,
} from "../../services/Api/OrderAPI";
import { orderData } from "../../interfaces/admin/Form";
import { ToastSucess } from "../../utils/toast";

const initialState: OrderState = {
  client: [],
  admin: [],
  status: "idle",
};
export const getOrder = createAsyncThunk("order/fetch", async () => {
  return await getAllOrderClient();
});

export const createOrder = createAsyncThunk(
  "order/create",
  async (data: orderData) => {
    return await createOrderService(data);
  }
);
export const UpdateOrder = createAsyncThunk(
  "order/update",
  async (data: {id:number,order_status:string}) => {
    return await updateOrderStatus(data);
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builer) =>
    builer
      .addCase(getOrder.fulfilled, (state, action) => {
        if (state.client) {
          state.client = action.payload.client;
        }
        if (state.admin) {
          state.admin = action.payload.admin;
        }
        state.status = "idle";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        if (state.client) {
          state.client.push(action.payload);
        }
        if (state.admin) {
          state.admin.push(action.payload);
        }
        state.status = "idle";
      }).addCase(UpdateOrder.fulfilled,(state,action)=>{
        if (state.client) {
         const i = state.client.findIndex((c)=> c?.id == action.payload.id);
         if(i){
          state.client[i] = action.payload;
         }
        }
        if (state.admin) {
          const i = state.admin.findIndex((c)=> c?.id == action.payload.id);
          if(i){
           state.admin[i] = action.payload;
          }
         }
         ToastSucess(`Chỉnh sửa trạng thái đơn hàng #${action.payload.code} thành công`);
        state.status = "idle";
      })
});
export default orderSlice.reducer;
