import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../services/Api/CategoryAPI";
import { IFormInput } from "../../interfaces/admin/Form";
import { CategoryState } from "../../interfaces/admin/Store";
const initialState: CategoryState = {
  categories: {
    original: [],
    headers: {},
    exception: null,
  },
  status: "idle",
};

export const getCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    return await getAllCategories();
  }
);

export const addCategory = createAsyncThunk(
  "categories/createCategory",
  async (data: IFormInput) => {
    return await createCategory(data);
  }
);

export const editCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, data }: { id: number; data: IFormInput }) => {
    return await updateCategory(id, data);
  }
);

export const removeCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: number) => {
    return await deleteCategory(id);
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getCategories.fulfilled, (state, action) => {
        if (state.categories) {
          state.categories = action.payload;
        }
        state.status = "idle";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        console.log(state.categories);

        if (state.categories) {
          state.categories.original.push(action.payload);
        }
        state.status = "idle";
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        if (state.categories) {
          const index = state.categories.original.findIndex(
            (cat) => cat.id === action.payload.id
          );
          if (index !== -1) {
            state.categories.original[index] = action.payload;
          }
        }
        state.status = "idle";
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        if (state.categories) {
          console.log("id:", action.payload.id);
          state.categories.original = state.categories.original.filter(
            (cat) => cat.id != action.payload.id
          );
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
          console.log("rejected");
        }
      );
  },
});

export default categorySlice.reducer;
