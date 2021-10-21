import React from "react";
import styled from "styled-components";

const Header = ({ selectedInvoice }) => {
  const { status } = selectedInvoice;
  return (
    <StyledHeader status={status}>
      <div className="left-side">
        <p className="status">Status</p>

        <div className="status-wrapper">
          <div className="circle"></div>
          <p className="status-type">Paid</p>
        </div>
      </div>

      <div className="right-side">
        <button className="edit">Edit</button>
        <button className="delete">Delete</button>
        {status === "pending" ||
          (status === "draft" && (
            <button className="mark-as-paid">Mark as Paid</button>
          ))}
      </div>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  margin-top: 40px;
  padding: 25px;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.1);

  .left-side {
    display: flex;
    align-items: center;

    .status {
      color: #888eb0;
      font-size: 12px;
    }

    .status-wrapper {
      padding: 15px 30px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      background-color: ${({ status }) =>
        status === "paid"
          ? "#f3fdf9"
          : status === "pending"
          ? "#fff8f0"
          : "#f3f3f5"};
      margin-left: 20px;

      .circle {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: ${({ status }) =>
          status === "paid"
            ? "#33d69f"
            : status === "pending"
            ? "#ff8f00"
            : "#373b53"};
        margin-right: 10px;
      }

      .status-type {
        font-size: 12px;
        font-weight: 700;
        color: ${({ status }) =>
          status === "paid"
            ? "#33d69f"
            : status === "pending"
            ? "#ff8f00"
            : "#373b53"};
      }
    }
  }

  .right-side {
    display: flex;
    align-items: center;

    button {
      padding: 15px 25px;
      background: none;
      border: none;
      cursor: pointer;
      border-radius: 25px;
      font-size: 12px;
      font-weight: 700;

      &.edit {
        color: #7e8cc3;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: #dfe3fa;
        }
      }

      &.delete {
        margin-left: 20px;
        background-color: #ec5757;
        color: #ffffff;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: #ff9797;
        }
      }

      &.mark-as-paid {
        background-color: #7c5dfa;
        color: #ffffff;
        margin-left: 10px;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: #9277ff;
        }
      }
    }
  }
`;
