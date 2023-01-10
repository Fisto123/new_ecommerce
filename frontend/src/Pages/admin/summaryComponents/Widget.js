import React from "react";
import styled from "styled-components";

const Widget = ({ data }) => {
  return (
    <StyledWrapper>
      <Icons color={data.color} bgcolor={data.bgcolor}>
        {data.icon}
      </Icons>
      <Text>
        <h3>
          {data.isMoney
            ? "$" + data.digits?.toLocaleString()
            : data.digits?.toLocaleString()}
        </h3>
        <p>{data.title}</p>
      </Text>
      {data.percentage < 0 ? (
        <Percentage isPositive={false}>
          {Math.floor(data.percentage) + "%"}
        </Percentage>
      ) : (
        <Percentage isPositive={true}>
          {Math.floor(data.percentage) + "%"}
        </Percentage>
      )}
    </StyledWrapper>
  );
};

export default Widget;
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Icons = styled.div`
  margin-right: 0.5rem;
  padding: 0.5rem;
  color: ${({ color }) => color};
  background: ${({ bgcolor }) => bgcolor};
  border-radius: 3px;
  align-items: center;
`;
const Text = styled.div`
  h3 {
    font-weight: 500;
  }
  p {
    font-size: 24px;
    color: rgba(234, 234, 255, 0.68);
  }
`;
const Percentage = styled.div`
  margin-left: 0.5rem;
  font-size: 14px;
  color: ${({ isPositive }) =>
    isPositive ? "rgb(114,225,40)" : "rgb(255,77,33)"};
`;
