import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { ordersEdit, ordersFetch } from "../../redux/orderSlice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const OrderList = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const { list } = useSelector((state) => state.order);
  useEffect(()=>{
      dispatch(ordersFetch())
  },[dispatch])
  const handleOrderDispatch = (id) =>{
    dispatch(ordersEdit({
      id,
      delivery_status:'dispatched'
    }))
  }
const handleOrderDeliver = (id) =>{
    dispatch(ordersEdit({
      id,
      delivery_status:'delivered'
    }))
  }
  
  const rows =
    list &&
    list.map((order) => {
      return {
        id: order?._id,
        cName: order?.shipping.name,
        amount: (order.total/100)?.toLocaleString(),
        dstatus: order?.delivery_status,
        date: moment(order?.createdAt).fromNow(),
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "cName",
      headerName: "Name",
      width: 80,
    },
    { field: "amount", headerName: "Amount($)", width: 130,
    renderCell: (params) => {
        return (
          <div>
            {params.row.dstatus === 'pending'? <Pending>pending</Pending>:
             params.row.dstatus === 'dispatched'? <Dispatched>Dispatched</Dispatched>:
             params.row.dstatus === 'delivered'? <Delivered>Delivered</Delivered>:
             (
              "error"
             )
            }
          </div>
        );
      },
  },
    {
      field: "dstatus",
      headerName: "",
      width: 130,
    },
    {
      field: "date",
      headerName: "Date",
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
           <DispatchedBtn onClick={()=>handleOrderDispatch(params.row.id)}>Dispatch</DispatchedBtn>
           <DeliveryBtn onClick={()=>handleOrderDeliver(params.row.id)}>Deliver</DeliveryBtn>
           <View onClick={() => nav(`/order/${params.row.id}`)}>View</View>
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

export default OrderList;



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

const Pending = styled.div`
  color: rgb(253, 181, 40);
   background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
`;
const DispatchedBtn = styled.div`
   background-color: rgb(38, 198, 249);
   border-radius: 10px;
   cursor: pointer;
`;
const DeliveryBtn = styled.div`
   background-color: rgb(102, 108, 255);
   border-radius: 10px;
   cursor: pointer;
`;
const Dispatched = styled.div`
  color: rgb(38, 198, 249);
   background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Delivered = styled.div`
  color: rgb(102, 108, 255);
   background-color: rgb(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const View = styled.div`
  background-color: rgb(144, 225, 40);
  padding: 7px;
  border-radius: 10px;
  cursor: pointer;
`;
