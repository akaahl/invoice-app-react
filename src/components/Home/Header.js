import React from "react";
import styled from "styled-components";
import arrowIcon from "../../assets/images/icon-arrow-down.svg";
import plusIcon from "../../assets/images/icon-plus.svg";

const Header = () => {
  return (
    <StyledHeader>
      <div className="left-side">
        <h1>Invoices</h1>
        <p>There are 7 total invoices.</p>
      </div>

      <div className="right-side">
        <div className="filter-wrapper">
          <button className="filter-btn">
            Filter by status
            <img src={arrowIcon} alt="arrow" />
          </button>
        </div>

        <button className="add-invoice-btn">
          <div className="icon">
            <img src={plusIcon} alt="plus icon" />
          </div>
          New Invoice
        </button>
      </div>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left-side {
    p {
      color: #888eb0;
      margin-top: 10px;
      font-size: 14px;
    }
  }

  .right-side {
    display: flex;
    align-items: center;
    .filter-wrapper {
      position: relative;
      margin-right: 20px;

      .filter-btn {
        border: none;
        padding: 10px;
        background: none;
        color: #000000;
        font-weight: 700;
        font-size: 12px;
        display: flex;
        align-items: center;

        img {
          margin-left: 10px;
        }
      }
    }

    .add-invoice-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: none;
      background-color: #7c5dfa;
      padding: 7px 14px 7px 7px;
      border: none;
      border-radius: 25px;
      color: #ffffff;
      font-weight: 700;
      font-size: 12px;

      .icon {
        display: grid;
        place-items: center;
        padding: 9px;
        border-radius: 50%;
        background-color: #ffffff;
        margin-right: 10px;
      }
    }
  }
`;
