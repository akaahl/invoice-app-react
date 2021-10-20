import React from "react";
import styled from "styled-components";
import arrowIcon from "../assets/images/icon-arrow-left.svg";
import Header from "../components/InvoicePage/Header";
import InvoiceDetails from "../components/InvoicePage/InvoiceDetails";

const InvoicePage = () => {
  return (
    <StyledWrapper>
      <nav>
        <button>
          <img src={arrowIcon} alt="arrow icon" />
          <span>Go back</span>
        </button>
      </nav>

      <Header />
      <InvoiceDetails />
    </StyledWrapper>
  );
};

export default InvoicePage;

const StyledWrapper = styled.main`
  width: 55%;
  margin: 70px 0 70px 50px;

  nav {
    button {
      display: flex;
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px 10px;

      &:hover {
        span {
          color: #7e88c3;
        }
      }

      img {
        margin-right: 20px;
      }

      span {
        font-size: 12px;
        transition: all 0.2s ease-in-out;
      }
    }
  }
`;
