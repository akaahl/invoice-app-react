import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateData, openModal } from "../../actions/dataActions";
import DeleteModal from "./DeleteModal";

const Header = ({ selectedInvoice, invoiceId }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { status, id } = selectedInvoice;
  const dispatch = useDispatch();

  const handleMarkAsPaid = (e) => {
    e.preventDefault();

    const invoiceStorage = JSON.parse(localStorage.getItem("invoiceStorage"));
    const newInvoices = invoiceStorage.map((invoice) =>
      invoice.id === id ? { ...invoice, status: "paid" } : invoice
    );
    localStorage.setItem("invoiceStorage", JSON.stringify(newInvoices));
    dispatch(updateData(newInvoices));
    console.log(newInvoices);
  };
  return (
    <StyledHeader status={status}>
      <div className="left-side">
        <p className="status">Status</p>

        <div className="status-wrapper">
          <div className="circle"></div>
          <p className="status-type">
            {status[0].toUpperCase() + status.substring(1)}
          </p>
        </div>
      </div>

      <div className="right-side">
        <button className="edit" onClick={() => dispatch(openModal(invoiceId))}>
          Edit
        </button>
        <button
          className="delete"
          onClick={() => {
            setDeleteModal(true);
            document.body.style.overflowY = "hidden";
          }}
        >
          Delete
        </button>
        {status === "pending" || status === "draft" ? (
          <button className="mark-as-paid" onClick={handleMarkAsPaid}>
            Mark as Paid
          </button>
        ) : null}
      </div>

      {deleteModal && <DeleteModal setDeleteModal={setDeleteModal} id={id} />}
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
