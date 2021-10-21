import React, { useEffect } from "react";
import styled from "styled-components";
import arrowIcon from "../assets/images/icon-arrow-left.svg";
import Header from "../components/InvoicePage/Header";
import InvoiceDetails from "../components/InvoicePage/InvoiceDetails";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../actions/dataActions";

const InvoicePage = () => {
  const history = useHistory();
  const id = useParams().id;

  const data = useSelector((state) => state.root.data);
  const selectedInvoice = data.filter((invoice) => invoice.id === id)[0];

  console.log(selectedInvoice);

  // useEffect(() => {
  //     const
  //     dispatch(fetchData())
  // }, [dispatch])

  return (
    <StyledWrapper>
      <nav>
        <button onClick={() => history.goBack()}>
          <img src={arrowIcon} alt="arrow icon" />
          <span>Go back</span>
        </button>
      </nav>

      <Header />
      <InvoiceDetails selectedInvoice={selectedInvoice} />
    </StyledWrapper>
  );
};

export default InvoicePage;

const StyledWrapper = styled.main`
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
