import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, LoginRequest } from "../../interfaces/authInterface";
import { authService } from "../../services/Auth/AuthService";
import { accountService } from "../../services/accountService";
import { registerInterface } from "../../interfaces/registerInterface";
import { AddressData } from "../../interfaces/admin/Form";
import { createAddress } from "../../services/Api/AddressAPI";
import { ToastSucess } from "../../utils/toast";

const initialState: AuthState = {
  user: null,
  status: "idle",
};
export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest) => {
    try {
      const res = await authService.login(data);
      if (res.data.token) {
        accountService.setAccountValue(res.data);
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCurrenUser = createAsyncThunk("auth/getUser", async () => {
  try {
    const res = await authService.getUser();

    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const register = createAsyncThunk(
  "auth/register",
  async (data: registerInterface) => {
    try {
      const res = await authService.register(data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const createNewAddress = createAsyncThunk(
  "user/createAddress",
  async (data: AddressData) => {
    return await createAddress(data);
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (state.user) {
          state.user = action.payload ?? null;
        }
        state.status = "idle";
      })
      .addCase(getCurrenUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload ?? null;
        state.status = "idle";
      })
      .addCase(createNewAddress.fulfilled, (state, action) => {
        if (state.user) {
          state.user.user.user.push(action.payload);
          ToastSucess("Thêm địa chỉ mới thành công ");
        }
        state.status = "idle";
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
          console.log("rejected :", state);
        }
      ),
});
export default authSlice.reducer;
