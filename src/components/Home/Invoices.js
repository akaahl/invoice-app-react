import React from "react";
import styled from "styled-components";
import arrowIcon from "../../assets/images/icon-arrow-right.svg";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../../utils";
import { useHistory } from "react-router-dom";

const Invoices = () => {
  const history = useHistory();
  const data = useSelector((state) => state.root.data);

  const handleClick = (id) => {
    console.log("clicked");
    history.push(`/invoice/${id}`);
  };

  return (
    <StyledList>
      {data.map(({ id, paymentDue, clientName, total, status }) => (
        <StyledInvoice
          key={uuidv4()}
          status={status}
          onClick={(e) => {
            e.preventDefault();
            handleClick(id);
          }}
        >
          <div className="left-side">
            <p className="id">
              <span>#</span>
              {id}
            </p>

            <p className="due-date">Due {formatDate(paymentDue)}</p>
            <p className="name">{clientName}</p>
          </div>

          <div className="right-side">
            <p className="amount">
              <span>&pound;</span>
              {total}
            </p>

            <div className="status-wrapper">
              <div className="circle"></div>
              <p className="status">
                {status[0].toUpperCase() + status.slice(1)}
              </p>
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
      width: 90px;
      span {
        color: #7e88c3;
      }
    }

    .due-date,
    .name {
      color: #888eb0;
    }

    .due-date {
      width: 140px;
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
      width: 110px;
      padding: 15px 0px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${({ status }) =>
        status === "paid"
          ? "#f3fdf9"
          : status === "pending"
          ? "#fff8f0"
          : "#f3f3f5"};
      margin-right: 20px;

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
        margin-right: 7px;
      }

      .status {
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
`;
