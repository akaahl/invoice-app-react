import React, { useEffect } from 'react';
import styled from 'styled-components';
import arrowIcon from '../assets/images/icon-arrow-left.svg';
import Header from '../components/InvoicePage/Header';
import InvoiceDetails from '../components/InvoicePage/InvoiceDetails';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const InvoicePage = () => {
  const history = useHistory();
  const id = useParams().id;

  const data = useSelector(state => state.root.data);
  const selectedInvoice = data.filter(invoice => invoice.id === id)[0];

  const invoiceVariants = {
    initial: {
      y: -400,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.7,
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
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <StyledWrapper
      variants={invoiceVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <nav>
        <button
          onClick={() => {
            history.push('/');
          }}
        >
          <img src={arrowIcon} alt="arrow icon" />
          <span>Go back</span>
        </button>
      </nav>

      <Header selectedInvoice={selectedInvoice} invoiceId={id} />
      <InvoiceDetails selectedInvoice={selectedInvoice} />
    </StyledWrapper>
  );
};

export default InvoicePage;

const StyledWrapper = styled(motion.main)`
  width: 700px;
  margin: 70px 0 70px 100px;

  nav {
    button {
      display: flex;
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px 10px;

      &:hover {
        span {
          color: ${({ theme }) => theme.btn};
        }
      }

      img {
        margin-right: 20px;
      }

      span {
        color: ${({ theme }) => theme.font};
        font-size: 12px;
        transition: all 0.2s ease-in-out;
      }
    }
  }

  @media (max-width: 1024px) {
    width: 90%;
    margin: 130px 0 70px 0;
  }

  @media (min-width: 1500px) {
    width: 80%;
  }
`;
