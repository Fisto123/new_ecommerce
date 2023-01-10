import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Register from "./Pages/register/Register";
import Login from "./Pages/Login/Login";
import CheckoutSuccess from "./payment/CheckoutSuccess";
import Dashboard from "./Pages/admin/Dashboard";
import Products from "./Pages/admin/Products";
import Summary from "./Pages/admin/Summary";
import Orders from "./Pages/admin/Orders";
import Users from "./Pages/admin/Users";
import { CreateProduct } from "./Pages/admin/CreateProduct";
import ProductList from "./components/list/ProductList";
import Product from "./Details/Product";
import UserProfile from "./Details/UserProfile";
import Order from "./Pages/admin/Order"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/order/:id" element={<Order/>} />
          <Route path="/admin" element={<Dashboard />}>
            <Route path="products" element={<Products />}>
              <Route path="create-product" element={<CreateProduct />}/>
              <Route index path="productlist" element={<ProductList />} />
            </Route>
            <Route path="summary" element={<Summary />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />}/>
          </Route>
          <Route path="/checkout_success" element={<CheckoutSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
