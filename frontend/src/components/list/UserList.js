import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDelete, usersFetch } from "../../redux/userSlice";
const UserList = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const { users } = useSelector((state) => state.user);
  useEffect(()=>{
      dispatch(usersFetch())
  },[dispatch])
  const handleDelete = (id)=>{
    if (window.confirm("do you want to delete this user")) {
     dispatch(userDelete(id))
    }
  }
  const rows =
    users &&
    users?.map((user) => {
      return {
        id: user?._id,
        uName: user?.name,
        uEmail: user?.email,
        admin: user?.isAdmin,
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "uName",
      headerName: "Name",
      width: 150,
    },
      {
      field: "uEmail",
      headerName: "Email",
      width: 200,
    },
    {
      field: "admin",
      headerName: "Role",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return (
         <>
          {  params.row.admin ? (
             <Admin>Admin</Admin>
            ):(
           <Customer>Customer</Customer>
            )}
         </>
        );
      },
    },
      {
      field: "actions",
      headerName: "Actions",
      width: 190,
      sortable: false,
      renderCell: (params) => {
        return (
          <Actions>
           <Delete onClick={()=>handleDelete(params.row.id)}>Delete</Delete>
           <View onClick={() => nav(`/user/${params.row.id}`)}>View</View>
          </Actions>
        );
      },
    },
  ];
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

export default UserList;



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
   cursor:pointer
`;

const View = styled.div`
   background-color: rgb(114, 225, 40);
   cursor:pointer
`;

const Admin = styled.div`
  color: rgb(225, 181, 40);
   background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Customer = styled.div`
  color: rgb(35, 198, 249);
   background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
