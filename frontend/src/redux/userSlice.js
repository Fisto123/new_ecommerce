import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
//import toast from "react-toastify";
const initialState = {
  users: [],
  status: null
};
export const usersFetch = createAsyncThunk(
  //three parameters actiontype,payload creator
  "users/usersFetch",
  async (id=null, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/user/api/getAllUsers "
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);  
export const userDelete = createAsyncThunk(
  //three parameters actiontype,payload creator
  "users/userDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/user/api/deleteUser/${id} `
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: (state) => {
      state.status = "pending";
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload;
    },
    [usersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [userDelete.pending]: (state) => {
      state.status = "pending";
    },
    [userDelete.fulfilled]: (state, action) => {
      const newUsers = state.users.filter(
        (user) => user._id !== action.payload._id
      );
      state.items = newUsers;
      state.status = "success";
      toast.success("User deleted");
      window.location.reload()
    },
    [userDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});
//export const {} = productSlice.actions

export default userSlice.reducer;
