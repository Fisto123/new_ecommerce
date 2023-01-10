import { configureStore } from "@reduxjs/toolkit";
import productReducer, { productFetch } from "./productSlice";
import orderReducer from './orderSlice'
import userReducer, { usersFetch } from './userSlice'
import cartReducer, { getTotal } from "./cartSlice";
import authReducer, { loadUser } from "./authSlice";
import { productsApi } from "./productApi";
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order:orderReducer,
    auth: authReducer,
    user:userReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
store.dispatch(productFetch());
store.dispatch(getTotal());
store.dispatch(loadUser(null));
store.dispatch(usersFetch())
export default store;
