import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils';
import { v4 as uuidv4 } from 'uuid';

const InvoiceDetails = ({ selectedInvoice }) => {
  const {
    clientAddress,
    clientEmail,
    clientName,
    createdAt,
    description,
    id,
    items,
    paymentDue,
    senderAddress,
    status,
    total,
  } = selectedInvoice;

  return (
    <StyledWrapper status={status}>
      <div className="top">
        <div className="left-side">
          <h2>
            <span>#</span>
            {id}
          </h2>

          <p className="description">{description}</p>
        </div>

        <div className="right-side">
          <p className="street-address">{senderAddress.street}</p>
          <p className="city">{senderAddress.city}</p>
          <p className="post-code">{senderAddress.postCode}</p>
          <p className="country">{senderAddress.country}</p>
        </div>
      </div>

      <div className="mid">
        <div className="dates">
          <div className="invoice-date">
            <p className="date">Invoice Date</p>
            <h2>{formatDate(createdAt)}</h2>
          </div>

          <div className="payment-due">
            <p className="due">Payment Due</p>
            <h2>{formatDate(paymentDue)}</h2>
          </div>
        </div>

        <div className="billing-details">
          <p className="bill-to">Bill To</p>
          <h2>{clientName}</h2>
          <p className="client-street-address">{clientAddress.street}</p>
          <p className="client-city">{clientAddress.city}</p>
          <p className="client-post-code">{clientAddress.postCode}</p>
          <p className="client-country">{clientAddress.country}</p>
        </div>

        <div className="sent-details">
          <p>Sent To</p>
          <h2>{clientEmail}</h2>
        </div>
      </div>

      <div className="bottom">
        <div className="item-labels">
          <div className="header-labels">
            <p className="name">Item Name</p>
            <p className="quantity">Qty.</p>
            <p className="price">Price</p>
            <p className="total">Total</p>
          </div>

          <ul className="item-details">
            {items.map(({ name, total, quantity, price }) => (
              <li className="individual-item" key={uuidv4()}>
                <p className="name">{name}</p>
                <p className="quantity">{quantity}</p>
                <p className="price">
                  {clientAddress.country === 'United States of America'
                    ? '$'
                    : '£'}
                  {price.toLocaleString()}
                </p>
                <p className="total">
                  {clientAddress.country === 'United States of America'
                    ? '$'
                    : '£'}
                  {total.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="amount-due">
          <p className="due">Amount Due</p>
          <h2 className="grand-total">
            {clientAddress.country === 'United States of America' ? '$' : '£'}
            {total.toLocaleString()}
          </h2>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default InvoiceDetails;

const StyledWrapper = styled.section`
  background-color: ${({ theme }) => theme.invoice};
  margin-top: 30px;
  padding: 25px;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-side {
      h2 {
        font-size: 18px;
        color: ${({ theme }) => theme.font};
        transition: color 0.2s ease-in-out;

        span {
          color: #7e88c3;
        }
      }

      .description {
        margin-top: 5px;
        font-size: 12px;
        color: ${({ theme }) => theme.text};
        transition: color 0.2s ease-in-out;
      }
    }

    .right-side {
      p {
        font-size: 12px;
        color: ${({ theme }) => theme.text};
        text-align: right;
        transition: color 0.2s ease-in-out;

        &:not(:first-child) {
          margin-top: 3px;
        }
      }
    }
  }

  .mid {
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;

    .dates {
      height: auto;
      min-height: 130px;
      width: 33%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        font-size: 12px;
        color: ${({ theme }) => theme.text};
        transition: color 0.2s ease-in-out;
      }

      h2 {
        margin-top: 10px;
        font-size: 15px;
        color: ${({ theme }) => theme.font};
        transition: color 0.2s ease-in-out;
      }
    }

    .billing-details {
      width: 33%;

      p {
        color: ${({ theme }) => theme.text};
        font-size: 12px;
        transition: color 0.2s ease-in-out;

        &.client-street-address {
          margin-top: 10px;
        }

        &.client-city,
        &.client-post-code,
        &.client-country {
          margin-top: 3px;
        }
      }

      h2 {
        margin-top: 10px;
        font-size: 15px;
        color: ${({ theme }) => theme.font};
        transition: color 0.2s ease-in-out;
      }
    }

    .sent-details {
      width: 33%;

      p {
        color: ${({ theme }) => theme.text};
        font-size: 12px;
        transition: color 0.2s ease-in-out;
      }

      h2 {
        margin-top: 10px;
        font-size: 15px;
        word-wrap: break-word;
        color: ${({ theme }) => theme.font};
        transition: color 0.2s ease-in-out;
      }
    }
  }

  .bottom {
    margin-top: 50px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .item-labels {
      display: flex;
      flex-direction: column;
      padding: 40px;
      background-color: ${({ theme }) => theme.status};
      transition: background-color 0.2s ease-in-out;

      .header-labels {
        display: flex;

        p {
          color: ${({ theme }) => theme.text};
          font-size: 12px;
          transition: color 0.2s ease-in-out;

          &.name {
            flex: 0.8;
          }

          &.quantity,
          &.price {
            flex: 0.4;
            text-align: center;
          }

          &.total {
            flex: 0.8;
            text-align: right;
          }
        }
      }

      .item-details {
        list-style: none;
        margin-top: 30px;
        display: flex;
        flex-direction: column;

        .individual-item {
          display: flex;

          &:not(:first-child) {
            margin-top: 30px;
          }

          p {
            color: ${({ theme }) => theme.font};
            font-size: 12px;
            font-weight: 700;
            transition: color 0.2s ease-in-out;

            &.name {
              flex: 0.8;
            }

            &.quantity,
            &.price {
              flex: 0.4;
              text-align: center;
            }

            &.total {
              flex: 0.8;
              text-align: right;
            }
          }
        }
      }
    }

    .amount-due {
      padding: 30px 40px;
      background-color: ${({ theme }) => theme.amountBg};
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: background-color 0.2s ease-in-out;

      p {
        font-size: 12px;
        color: #ffffff;
        font-weight: 700;
      }

      h2 {
        font-size: 18px;
        color: #ffffff;
        font-weight: 700;
      }
    }
  }

  @media (max-width: 768px) {
    .top {
      flex-direction: column;
      align-items: initial;

      .right-side {
        margin-top: 50px;
        p {
          text-align: left;
        }
      }
    }

    .mid {
      margin-top: 50px;
      display: grid;
      justify-content: initial;
      grid-template-areas:
        'dates bill'
        'sent .';

      .dates,
      .billing-details,
      .sent-details {
        width: 100%;
      }

      .dates {
        grid-area: dates;
      }

      .billing-details {
        grid-area: bill;
      }

      .sent-details {
        grid-area: sent;
      }

      .sent-details {
        margin-top: 70px;
      }
    }

    .bottom {
      .item-labels {
        padding: 25px;
      }

      .amount-due {
        padding: 25px;
      }
    }
  }

  @media (max-width: 425px) {
    padding: 15px;

    .top {
      .left-side {
        h2 {
          font-size: 14px;
        }

        p {
          font-size: 10px;
        }
      }

      .right-side {
        p {
          font-size: 10px;
        }
      }
    }

    .mid {
      display: flex;
      flex-direction: column;

      .dates {
        flex-direction: row;
        min-height: auto;

        .invoice-date,
        .payment-due {
          h2 {
            font-size: 14px;
          }

          p {
            font-size: 10px;
          }
        }
      }

      .billing-details {
        margin-top: 40px;

        h2 {
          font-size: 14px;
        }

        p {
          font-size: 10px;
        }
      }

      .sent-details {
        margin-top: 40px;

        h2 {
          font-size: 14px;
        }

        p {
          font-size: 10px;
        }
      }
    }

    .bottom {
      .item-labels {
        padding: 15px;

        .header-labels {
          p {
            font-size: 10px;
          }
          .price,
          .quantity {
            display: none;
          }
        }

        .item-details {
          .individual-item {
            p {
              font-size: 10px;
            }
            .price,
            .quantity {
              display: none;
            }
          }
        }
      }

      .amount-due {
        padding: 15px;

        h2 {
          font-size: 14px;
        }

        p {
          font-size: 10px;
        }
      }
    }
  }
`;
