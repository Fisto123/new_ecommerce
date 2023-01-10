import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
//import toast from "react-toastify";
const initialState = {
  items: [],
  status: null,
  createStatus: null,
  error: null,
  deleteStatus: null,
  editStatus: null,
};

export const productFetch = createAsyncThunk(
  //three parameters actiontype,payload creator
  "products/productFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/products/api/getProduct "
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const productCreate = createAsyncThunk(
  //three parameters actiontype,payload creator
  "products/productCreate",
  async (inputs, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/products/api/createProduct ",
        inputs
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const productDelete = createAsyncThunk(
  //three parameters actiontype,payload creator
  "products/productDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/products/api/deleteProductById/${id} `
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const productUpdate = createAsyncThunk(
  //three parameters actiontype,payload creator
  "products/productUpdate",
  async (value) => {
    console.log(value);
    try {
      const response = await axios.patch(
        `http://localhost:5000/products/api/editProduct/${value.product._id} `,
        value.product
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productFetch.pending]: (state) => {
      state.status = "pending";
    },
    [productFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [productFetch.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [productCreate.pending]: (state) => {
      state.createStatus = "pending";
    },
    [productCreate.fulfilled]: (state, action) => {
      state.createStatus = "success";
      state.items.push(action.payload);
       toast.success("product created successfully");
    },
    [productCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
      state.error = action.payload;
    },
    [productDelete.pending]: (state) => {
      state.deleteStatus = "pending";
    },
    [productDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter(
        (item) => item._id !== action.payload_id
      );
      state.items = newList;
      state.deleteStatus = "success";
      toast.success("product deleted");
      window.location.reload()
    },
    [productDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [productUpdate.pending]: (state) => {
      state.editStatus = "pending";
    },
    [productUpdate.fulfilled]: (state, action) => {
      const updatedProduct = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      state.items = updatedProduct;
      state.editStatus = "success";
      toast.success("product updated successfully");
    },
    [productUpdate.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
  },
});
//export const {} = productSlice.actions

export default productSlice.reducer;
