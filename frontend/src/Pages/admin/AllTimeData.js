import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const AllTimeData = () => {
const { items } = useSelector((state) => state.product);
  const { users } = useSelector((state) => state.user); 
  return (
    <Main>
      <Info>
        <Title>Users</Title>
        <Data>{users?.length}</Data>
      </Info>
      <Info>
        <Title>Products</Title>
        <Data>{items?.length}</Data>
      </Info>
      <Info>
        <Title>Earnings</Title>
        <Data>$20,000</Data>
      </Info>
    </Main>
  );
};

export default AllTimeData;

const Main = styled.div`
  background: rgb(48, 51, 78);
  color: "rgba(234,234,255,0.68)";
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 5px;
  font-size: 14px;
`;
const Info = styled.div`
  display: flex;
  margin-top: 1.5rem;
  padding: 0.3rem;
  border-radius: 3px;
  background: rgb(38, 190, 249, 0.12);
  &:nth-child(even) {
    background: rgb(38, 190, 249, 0.12);
  }
`;
const Title = styled.div`
  flex: 1;
  color: white;
`;
const Data = styled.div`
  flex: 1;
  font-weight: 700;
  color: white;
`;
