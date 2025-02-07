import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AttributeState } from "../../interfaces/admin/Store";
import {
  createAttribute,
  createAttributevalue,
  deleteAttribute,
  deleteAttributevalue,
  getDataAttribute,
  updateAttribute,
  updateAttributevalue,
} from "../../services/Api/AttributeAPI";
import {
  attributeInput,
  attributeValueInput,
} from "../../interfaces/admin/Form";

const initialState: AttributeState = {
  attribute: [],
  status: "idle",
};
export const getAtrribute = createAsyncThunk(
  "attribute/getAttribute",
  async () => {
    return await getDataAttribute();
  }
);
export const AddAtrribute = createAsyncThunk(
  "attribute/createAttribute",
  async (data: attributeInput) => {
    return await createAttribute(data);
  }
);
export const AddAtrributeValue = createAsyncThunk(
  "attribute/createAttribute/value",
  async (data: attributeValueInput) => {
    return await createAttributevalue(data);
  }
);
export const EditAtrribute = createAsyncThunk(
  "attribute/editAttribute",
  async ({ id, data }: { id: number; data: attributeInput }) => {
    return await updateAttribute(id, data);
  }
);
export const EditAtrributeValue = createAsyncThunk(
  "attribute/editAttribute/value",
  async ({ id, data }: { id: number; data: attributeValueInput }) => {
    return await updateAttributevalue(id, data);
  }
);
export const DelAtrribute = createAsyncThunk(
  "attribute/delAttribute",
  async (id: number) => {
    return await deleteAttribute(id);
  }
);
export const DelAtrributeValue = createAsyncThunk(
  "attribute/delAttribute/value",
  async (id: number) => {
    return await deleteAttributevalue(id);
  }
);
const attributeSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(getAtrribute.fulfilled, (state, action) => {
        if (state.attribute) {
          state.attribute = action.payload;
        }
        state.status = "idle";
      })
      .addCase(AddAtrribute.fulfilled, (state, action) => {
        state.attribute.push(action.payload);
        state.status = "idle";
      })
      .addCase(EditAtrribute.fulfilled, (state, action) => {
        if (state.attribute) {
          const index = state.attribute.findIndex(
            (cat) => cat.id === action.payload.id
          );
          if (index !== -1) {
            state.attribute[index] = action.payload;
          }
        }
        state.status = "idle";
      })
      .addCase(DelAtrribute.fulfilled, (state, action) => {
        if (state.attribute) {
          state.attribute = state.attribute.filter(
            (cat) => cat.id != action.payload.id
          );
        }
      })
      .addCase(AddAtrributeValue.fulfilled, (state, action) => {
        console.log(action.payload);

        const { attribute_id, ...newValue } = action.payload;
        state.attribute.forEach((attr) => {
          if (attr.id == attribute_id) {
            attr.attribute_value.push(newValue);
          }
        });
        state.status = "idle";
      })

      .addCase(EditAtrributeValue.fulfilled, (state, action) => {
        const { id, attribute_id, value } = action.payload;
        state.attribute.forEach((attr) => {
          if (attr.id == attribute_id) {
            attr.attribute_value.forEach((val) => {
              if (val.id == id) {
                val.value = value;
              }
            });
          }
        });
        state.status = "idle";
      })

      .addCase(DelAtrributeValue.fulfilled, (state, action) => {
        const id = action.payload[0].id;
        state.attribute.forEach((attr) => {
          attr.attribute_value = attr.attribute_value.filter(
            (val) => val.id != id
          );
        });
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
      );
  },
});
export default attributeSlice.reducer;
