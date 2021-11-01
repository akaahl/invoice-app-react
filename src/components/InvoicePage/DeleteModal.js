import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateData } from '../../actions/dataActions';
import { motion } from 'framer-motion';

const DeleteModal = ({ setDeleteModal, id }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = e => {
    e.preventDefault();
    setDeleteModal(false);

    setTimeout(() => {
      history.push('/');
    }, 500);

    setTimeout(() => {
      const invoiceStorage = JSON.parse(localStorage.getItem('invoiceStorage'));
      const newInvoices = invoiceStorage.filter(invoice => invoice.id !== id);
      localStorage.setItem('invoiceStorage', JSON.stringify(newInvoices));
      dispatch(updateData(newInvoices));
      document.body.style.overflowY = 'scroll';
    }, 1000);
  };

  const modalWrapperVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        when: 'afterChildren',
      },
    },
  };

  const modalVariants = {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
    },
    exit: {
      scale: 0,
    },
  };

  return createPortal(
    <StyledModalWrapper
      onClick={() => {
        setDeleteModal(false);
        document.body.style.overflowY = 'scroll';
      }}
      variants={modalWrapperVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="delete-wrapper"
        onClick={e => e.stopPropagation()}
        variants={modalVariants}
      >
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
              document.body.style.overflowY = 'scroll';
            }}
          >
            Cancel
          </button>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </motion.div>
    </StyledModalWrapper>,
    document.getElementById('modal')
  );
};

export default DeleteModal;

const StyledModalWrapper = styled(motion.aside)`
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
    background-color: ${({ theme }) => theme.invoice};
    padding: 40px;
    border-radius: 8px;
    width: 500px;
    transition: background-color 0.2s ease-in-out;

    h4 {
      font-size: 24px;
      color: ${({ theme }) => theme.font};
      transition: color 0.2s ease-in-out;
    }

    p {
      margin-top: 15px;
      font-size: 14px;
      color: ${({ theme }) => theme.text};
      transition: color 0.2s ease-in-out;
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
        transition: background-color 0.2s ease-in-out;

        &.cancel {
          margin-right: 10px;
          color: #7d5cfa;
          background-color: ${({ theme }) => theme.status};
          transition: background-color 0.2s ease-in-out;

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

  @media (max-width: 768px) {
    .delete-wrapper {
      width: 80%;
    }
  }

  @media (max-width: 425px) {
    .delete-wrapper {
      padding: 20px;
      width: 90%;

      h4 {
        font-size: 20px;
      }

      p {
        font-size: 10px;
      }

      p,
      .btns-wrapper {
        margin-top: 30px;
      }

      .btns-wrapper {
        justify-content: initial;

        button {
          padding: 10px 15px;
          font-size: 10px;
        }
      }
    }
  }
`;
