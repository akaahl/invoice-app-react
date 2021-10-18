import React from "react";
import styled from "styled-components";
import Header from "../components/Home/Header";

const Home = () => {
  return (
    <StyledHome>
      <Header />
    </StyledHome>
  );
};

export default Home;

const StyledHome = styled.main`
  width: 55%;
  margin: 70px 0 70px 50px;
`;
