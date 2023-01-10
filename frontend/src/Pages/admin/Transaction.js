import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { setHeaders } from "../../redux/api";
import moment from "moment";
const Transaction = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/orders/api/geAllOrder",
          setHeaders()
        );
        setOrders(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <StyledTransaction>
      {loading ? (
        <>Transaction loading.....</>
      ) : (
        <>
          <h2>Latest Transaction</h2>
          {orders?.map((order, index) => {
            return (
              <Transactions key={index}>
                <p>{order?.shipping?.name}</p>
                <p>{(order?.total / 100).toLocaleString()}</p>
                <p>{moment(order?.createdAt).fromNow()}</p>
              </Transactions>
            );
          })}
        </>
      )}
    </StyledTransaction>
  );
};

export default Transaction;

const StyledTransaction = styled.div`
  background: rgb(48, 51, 78);
  color: rgb(234, 234, 255, 0.87);
  margin-top: 20px;
  padding: 1rem;
  border-radius: 5px;
`;
const Transactions = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 2px;
  background: rgb(38, 190, 249, 0.12);
  p {
    flex: 1;
    color: white;
  }
  &:nth-child(even) {
    background: rgb(38, 190, 249, 0.12);
  }
`;
