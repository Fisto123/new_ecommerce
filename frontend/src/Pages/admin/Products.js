import React from "react";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";
import { Outlet, useNavigate } from "react-router-dom";
const Products = () => {
  const nav = useNavigate();
  return (
    <>
      <AdminHeaders>
        <h2>Products</h2>
        <PrimaryButton onClick={() => nav("/admin/products/create-product")}>
          Create
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
    </>
  );
};

export default Products;
