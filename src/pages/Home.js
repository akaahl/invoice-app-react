import React from "react";
import styled from "styled-components";
import Header from "../components/Home/Header";
import Invoices from "../components/Home/Invoices";

const Home = () => {
  return (
    <StyledHome>
      <Header />
      <Invoices />
    </StyledHome>
  );
};

export default Home;

const StyledHome = styled.main`
  width: 55%;
  margin: 70px 0 70px 50px;
`;
