import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { productDelete } from "../../redux/productSlice";
import { EditProduct } from "../../Pages/admin/EditProduct";
const ProductList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.product);
  const nav = useNavigate();
  const rows =
    items &&
    items.map((item) => {
      return {
        id: item._id,
        imageUrl: item.image,
        pName: item.name,
        pDesc: item.desc,
        price: item?.price?.toLocaleString(),
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "image",
      width: 80,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="img" />
          </ImageContainer>
        );
      },
    },
    { field: "pName", headerName: "Name", width: 130 },
    {
      field: "pDesc",
      headerName: "Description",
      width: 130,
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 190,
      sortable: false,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            <EditProduct prodId={params.row.id} />
            <View onClick={() => nav(`/product/${params.row.id}`)}>View</View>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm("do you want to delete this product")) {
      dispatch(productDelete(id));
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionClick
      />
    </div>
  );
};

export default ProductList;

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    border-radius: 3px;
    cursor: pointer;
  }
`;
const Delete = styled.div`
  background-color: rgb(255, 77, 73);
  padding: 7px;
  border-radius: 10px;
  cursor: pointer;
`;

const View = styled.div`
  background-color: rgb(144, 225, 40);
  padding: 7px;
  border-radius: 10px;
  cursor: pointer;
`;
