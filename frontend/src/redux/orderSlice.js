import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//import toast from "react-toastify";
const initialState = {
  list: [],
  status: null
};

export const ordersFetch = createAsyncThunk(
  //three parameters actiontype,payload creator
  "orders/ordersFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/orders/api/geAllOrder "
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const ordersEdit = createAsyncThunk(
  //three parameters actiontype,payload creator
  "orders/ordersEdit",
    async(values,{getState})=>{
         const state = getState();
         let currentorder = state.order.list.filter((order)=>order._id === values.id)
         const newOrder = {
        ...currentorder[0],
        delivery_status:values.delivery_status
    }

    try {
        const res = await axios.put(`http://localhost:5000/orders/api/updateOrder/${values.id}`,newOrder)
        console.log(res.data);

        return res.data
    } catch (error) {
        
    }

    } 
    
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [ordersFetch.pending]: (state) => {
      state.status = "pending";
    },
    [ordersFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.list = action.payload;
    },
    [ordersFetch.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [ordersEdit.pending]: (state) => {
      state.status = "pending";
    },
    [ordersEdit.fulfilled]: (state, action) => {
      state.status = "success";
     const updatedOrders = state.list.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      state.list = updatedOrders;
    },
    [ordersEdit.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});
//export const {} = productSlice.actions

export default orderSlice.reducer;
