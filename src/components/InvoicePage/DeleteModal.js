import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateData } from "../../actions/dataActions";

const DeleteModal = ({ setDeleteModal, id }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();

    const invoiceStorage = JSON.parse(localStorage.getItem("invoiceStorage"));
    const newInvoices = invoiceStorage.filter((invoice) => invoice.id !== id);
    localStorage.setItem("invoiceStorage", JSON.stringify(newInvoices));
    dispatch(updateData(newInvoices));
    history.push("/");
    document.body.style.overflowY = "scroll";
  };

  return ReactDom.createPortal(
    <StyledModalWrapper
      onClick={() => {
        setDeleteModal(false);
        document.body.style.overflowY = "scroll";
      }}
    >
      <div className="delete-wrapper" onClick={(e) => e.stopPropagation()}>
        <h4>Confirm Deletion</h4>
        <p>
          Are you sure you want to delete invoice {id}? This action cannot be
          undone.
        </p>

        <div className="btns-wrapper">
          <button
            className="cancel"
            onClick={() => {
              setDeleteModal(false);
              document.body.style.overflowY = "scroll";
            }}
          >
            Cancel
          </button>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </StyledModalWrapper>,
    document.getElementById("modal")
  );
};

export default DeleteModal;

const StyledModalWrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 200;
  display: grid;
  place-items: center;

  .delete-wrapper {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 8px;
    width: 500px;

    h4 {
      font-size: 24px;
    }

    p {
      margin-top: 15px;
      font-size: 14px;
      color: #888eb0;
    }

    .btns-wrapper {
      margin-top: 15px;
      margin-left: auto;
      margin-right: 0;
      display: flex;
      justify-content: flex-end;

      button {
        background: none;
        border: none;
        padding: 15px 25px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s ease-in-out;

        &.cancel {
          margin-right: 10px;
          color: #7d5cfa;

          &:hover {
            background-color: #dfe3fa;
          }
        }

        &.delete {
          background-color: #ec5757;
          color: #ffffff;

          &:hover {
            background-color: #ff9797;
          }
        }
      }
    }
  }
`;
