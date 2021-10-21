import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Home/Header";
import Invoices from "../components/Home/Invoices";
import { useDispatch } from "react-redux";
import { fetchData } from "../actions/dataActions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const dataUrl = "data.json";

    dispatch(fetchData(dataUrl));
  }, [dispatch]);
  return (
    <StyledHome>
      <Header />
      <Invoices />
    </StyledHome>
  );
};

export default Home;

const StyledHome = styled.main`
  width: 750px;
  margin: 70px 0 70px 100px;
`;
