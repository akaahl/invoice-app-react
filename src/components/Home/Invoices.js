import React from "react";
import styled from "styled-components";
import arrowIcon from "../../assets/images/icon-arrow-right.svg";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const Invoices = () => {
  const data = useSelector((state) => state.root.data);

  return (
    <StyledList>
      {data.map(({ id, paymentDue, clientName, total, status }) => (
        <StyledInvoice key={uuidv4()}>
          <div className="left-side">
            <p className="id">
              <span>#</span>
              {id}
            </p>

            <p className="due-date">Due {paymentDue}</p>
            <p className="name">{clientName}</p>
          </div>

          <div className="right-side">
            <p className="amount">
              <span>&pound;</span>
              {total}
            </p>

            <div className="status-wrapper">
              <div className="circle"></div>
              <p className="status">{status}</p>
            </div>

            <img src={arrowIcon} alt="arrow icon" />
          </div>
        </StyledInvoice>
      ))}
    </StyledList>
  );
};

export default Invoices;

const StyledList = styled.ul`
  margin-top: 60px;
  list-style: none;
`;

const StyledInvoice = styled.li`
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 15px 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid #7c5dfa;
  }

  &:not(:first-child) {
    margin-top: 20px;
  }

  .left-side {
    display: flex;
    align-items: center;

    p {
      font-size: 12px;
    }

    .id {
      font-weight: 700;
      span {
        color: #7e88c3;
      }
    }

    .due-date,
    .name {
      color: #888eb0;
      margin-left: 30px;
    }
  }

  .right-side {
    display: flex;
    align-items: center;

    .amount {
      font-size: 16px;
      font-weight: 700;
      margin-right: 30px;
    }

    .status-wrapper {
      padding: 15px 30px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      background-color: #f3fdf9;
      margin-right: 20px;

      .circle {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: #33d69f;
        margin-right: 10px;
      }

      .status {
        font-size: 12px;
        font-weight: 700;
        color: #33d69f;
      }
    }
  }
`;
