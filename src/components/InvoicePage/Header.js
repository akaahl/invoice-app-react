import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateData, openModal } from '../../actions/dataActions';
import DeleteModal from './DeleteModal';
import { AnimatePresence } from 'framer-motion';

const Header = ({ selectedInvoice, invoiceId }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { status, id } = selectedInvoice;
  const dispatch = useDispatch();

  const handleMarkAsPaid = e => {
    e.preventDefault();

    const invoiceStorage = JSON.parse(localStorage.getItem('invoiceStorage'));
    const newInvoices = invoiceStorage.map(invoice =>
      invoice.id === id ? { ...invoice, status: 'paid' } : invoice
    );
    localStorage.setItem('invoiceStorage', JSON.stringify(newInvoices));
    dispatch(updateData(newInvoices));
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
        <button
          className="edit"
          onClick={() => {
            dispatch(openModal(invoiceId));
            document.body.style.overflowY = 'hidden';
          }}
        >
          Edit
        </button>
        <button
          className="delete"
          onClick={() => {
            setDeleteModal(true);
            document.body.style.overflowY = 'hidden';
          }}
        >
          Delete
        </button>
        {status === 'pending' || status === 'draft' ? (
          <button className="mark-as-paid" onClick={handleMarkAsPaid}>
            Mark as Paid
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {deleteModal && <DeleteModal setDeleteModal={setDeleteModal} id={id} />}
      </AnimatePresence>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  margin-top: 40px;
  padding: 25px;
  width: 100%;
  background-color: ${({ theme }) => theme.invoice};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out;

  .left-side {
    display: flex;
    align-items: center;

    .status {
      color: ${({ theme }) => theme.text};
      font-size: 12px;
      transition: color 0.2s ease-in-out;
    }

    .status-wrapper {
      padding: 15px 30px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      background-color: ${({ status, theme }) =>
        status === 'paid'
          ? theme.paidBg
          : status === 'pending'
          ? theme.pendingBg
          : theme.draftBg};
      margin-left: 20px;

      .circle {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: ${({ status, theme }) =>
          status === 'paid'
            ? '#33d69f'
            : status === 'pending'
            ? '#ff8f00'
            : theme.draft};
        margin-right: 10px;
      }

      .status-type {
        font-size: 12px;
        font-weight: 700;
        color: ${({ status, theme }) =>
          status === 'paid'
            ? '#33d69f'
            : status === 'pending'
            ? '#ff8f00'
            : theme.draft};
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
        color: ${({ theme }) => theme.edit};
        background-color: ${({ theme }) => theme.status};
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: #dfe3fa;
        }
      }

      &.delete {
        margin-left: 20px;
        background-color: #ec5757;
        color: #ffffff;

        &:hover {
          transition: background-color 0.2s ease-in-out;
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

  @media (max-width: 768px) {
    padding: 15px;
    .left-side {
      .status {
        display: none;
      }

      .status-wrapper {
        margin-left: 0;
        padding: 10px 15px;
        justify-content: center;

        .circle {
          height: 6px;
          width: 6px;
        }

        .status-type {
          font-size: 10px;
        }
      }
    }

    .right-side {
      display: grid;
      grid-template-areas:
        'edit delete'
        'mark mark';

      button {
        padding: 10px 15px;
        font-size: 10px;

        &.edit {
          grid-area: edit;
        }

        &.delete {
          margin-left: 10px;
          grid-area: delete;
        }

        &.mark-as-paid {
          grid-area: mark;
          margin-left: 0;
          margin-top: 10px;
          width: 100%;
        }
      }
    }
  }
`;
