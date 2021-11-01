import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Home/Header';
import Invoices from '../components/Home/Invoices';
import { useDispatch } from 'react-redux';
import { fetchData, updateData } from '../actions/dataActions';
import { motion } from 'framer-motion';

const Home = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const dispatch = useDispatch();

  const homeVariants = {
    initial: {
      x: -200,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.4,
      },
    },
    exit: {
      x: 200,
      opacity: 0,
      transition: {
        type: 'spring',
        duration: 0.4,
      },
    },
  };

  useEffect(() => {
    const dataUrl = 'data.json';
    const invoiceStorage = JSON.parse(localStorage.getItem('invoiceStorage'));

    if (invoiceStorage) {
      dispatch(updateData(invoiceStorage));
    } else {
      dispatch(fetchData(dataUrl));
    }
  }, [dispatch]);
  return (
    <StyledHome
      variants={homeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
      <Invoices filterStatus={filterStatus} />
    </StyledHome>
  );
};

export default Home;

const StyledHome = styled(motion.main)`
  width: 750px;
  margin: 70px 0 70px 100px;

  @media (max-width: 1024px) {
    width: 90%;
    margin: 170px 0 70px 0;
  }

  @media (min-width: 1500px) {
    width: 80%;
  }
`;
