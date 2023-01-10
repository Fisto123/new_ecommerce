import React, { useEffect, useState } from "react";
import { Person } from "@mui/icons-material";
import axios from "axios";
import styled from "styled-components";
import Widget from "./summaryComponents/Widget";
import { setHeaders } from "../../redux/api";
import Chart from "./Chart";
import Transaction from "./Transaction";
import AllTimeData from "./AllTimeData";
const Summary = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userPerc, setUsersPerc] = useState(0);
  const [orderPerc, setOrderPerc] = useState(0);

  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState(0);

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
  useEffect(() => {
    const response = async () => {
      try {
        const res = await axios.get(
          "http://localhost:6000/user/api/getUser",
          setHeaders()
        );
        res.data.sort(compare);
        setUsers(res.data);
        setUsersPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {}
    };
    response();
  }, []);
  useEffect(() => {
    const response = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/orders/api/getOrder",
          setHeaders()
        );
        res.data.sort(compare);
        setOrders(res.data);
        setOrderPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {}
    };
    response();
  }, []);
  useEffect(() => {
    const response = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/earnings/api/getEarnings",
          setHeaders()
        );
        res.data.sort(compare);
        setIncome(res.data);
        setIncomePerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {}
    };
    response();
  }, []);
  const data = [
    {
      icon: <Person />,
      digits: users[0]?.total,
      isMoney: false,
      title: "Users",
      color: "rgb(102,108,255)",
      bgColor: "rgba(102,108,255,0.12)",
      percentage: userPerc,
    },
    {
      icon: <Person />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Orders",
      color: "rgb(38,198,249)",
      bgColor: "rgba(38,198,249,0.12)",
      percentage: orderPerc,
    },
    {
      icon: <Person />,
      digits: income[0]?.total ? income[0]?.total / 100 : "",
      isMoney: true,
      title: "Earnings",
      color: "rgb(253,181,40)",
      bgColor: "rgba(38,198,249,0.12)",
      percentage: incomePerc,
    },
  ];
  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>YOUR SHOP IS PERFOMING COMPARED TO THE PREVIOUS</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => (
              <Widget index={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overview>
        <Chart />
        <Transaction />
        <AllTimeData />
      </MainStats>
    </StyledSummary>
  );
};

export default Summary;
const StyledSummary = styled.div`
  flex: 2;
  width: "100%";
`;
const MainStats = styled.div`
  flex: 2;
  width: "100%";
`;
const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;
const Overview = styled.div`
  background: rgb(48, 51, 78);
  color: "rgba(234,234,255,0.68)";
  width: 100%;
  padding: 1.5rem;
  height: 200px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const WidgetWrapper = styled.div`
  flex: 1;
  display: flex;
  margin-left: 2rem;
  width: 100%;
`;
const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;
