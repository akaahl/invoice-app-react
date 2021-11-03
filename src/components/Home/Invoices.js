import React from 'react';
import styled from 'styled-components';
import arrowIcon from '../../assets/images/icon-arrow-right.svg';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import EmptyInvoice from './EmptyInvoice';

const Invoices = ({ filterStatus }) => {
  const history = useHistory();
  const data = useSelector(state => state.root.data).filter(invoice =>
    filterStatus === 'paid'
      ? invoice.status === 'paid'
      : filterStatus === 'draft'
      ? invoice.status === 'draft'
      : filterStatus === 'pending'
      ? invoice.status === 'pending'
      : invoice.status !== 'all'
  );

  const handleClick = id => {
    history.push(`/invoice/${id}`);
  };

  const ulVariants = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const liVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <StyledList variants={ulVariants} initial="initial" animate="animate">
      {data.length ? (
        data.map(
          (
            { id, paymentDue, clientName, total, status, clientAddress },
            index
          ) => (
            <StyledInvoice
              key={index}
              status={status}
              onClick={e => {
                e.preventDefault();
                handleClick(id);
              }}
              role="button"
              tabIndex="0"
              onKeyPress={e => {
                if (e.code === 'Enter') {
                  e.preventDefault();
                  handleClick(id);
                }
              }}
              variants={liVariants}
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
                  <span>
                    {clientAddress.country === 'United States of America'
                      ? '$'
                      : '£'}
                  </span>
                  {total.toLocaleString()}
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
          )
        )
      ) : (
        <EmptyInvoice filterStatus={filterStatus} />
      )}
    </StyledList>
  );
};

export default Invoices;

const StyledList = styled(motion.ul)`
  margin-top: 60px;
  list-style: none;
`;

const StyledInvoice = styled(motion.li)`
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.invoice};
  padding: 15px 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  z-index: 1;

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
      color: ${({ theme }) => theme.font};
      transition: color 0.2s ease-in-out;
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
      color: ${({ theme }) => theme.text};
      transition: color 0.2s ease-in-out;
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
      color: ${({ theme }) => theme.font};
      transition: color 0.2s ease-in-out;
    }

    .status-wrapper {
      width: 110px;
      padding: 15px 0px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${({ status, theme }) =>
        status === 'paid'
          ? theme.paidBg
          : status === 'pending'
          ? theme.pendingBg
          : theme.draftBg};
      margin-right: 20px;

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
        margin-right: 7px;
      }

      .status {
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

  @media (max-width: 768px) {
    align-items: initial;
    padding: 25px;

    .left-side {
      flex-direction: column;
      justify-content: space-between;
      align-items: initial;

      p {
        width: initial;
      }
    }

    .right-side {
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;

      .amount,
      .status-wrapper {
        margin-right: 0;
      }

      .status-wrapper {
        margin-top: 20px;
      }

      img {
        display: none;
      }
    }
  }

  @media (max-width: 425px) {
    padding: 20px;

    .right-side {
      .amount {
        font-size: 14px;
      }

      .status-wrapper {
        width: 80px;
      }
    }
  }
`;
