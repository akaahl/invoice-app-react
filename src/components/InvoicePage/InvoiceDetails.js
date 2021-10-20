import React from "react";
import styled from "styled-components";

const InvoiceDetails = () => {
  return (
    <StyledWrapper>
      <div className="top">
        <div className="left-side">
          <h2>
            <span>#</span>
            XM9141
          </h2>

          <p className="description">Graphic Design</p>
        </div>

        <div className="right-side">
          <p className="street-address">19 Union Terrace</p>
          <p className="city">London</p>
          <p className="post-code">E1 3EZ</p>
          <p className="country">United Kingdom</p>
        </div>
      </div>

      <div className="mid">
        <div className="dates">
          <div className="invoice-date">
            <p className="date">Invoice Date</p>
            <h2>21 Aug 2021</h2>
          </div>

          <div className="payment-due">
            <p className="due">Payment Due</p>
            <h2>20 Sep 2021</h2>
          </div>
        </div>

        <div className="billing-details">
          <p className="bill-to">Bill To</p>
          <h2>Melissa Clarke</h2>
          <p className="client-street-address">46 Abbey Row</p>
          <p className="client-city">Cambridge</p>
          <p className="client-post-code">CB5 6EG</p>
          <p className="client-country">United Kingdom</p>
        </div>

        <div className="sent-details">
          <p>Sent To</p>
          <h2>melissa.clarkefgagagdagagagagdagdsgsg@example.com</h2>
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
            <li className="individual-item">
              <p className="name">New Logo</p>
              <p className="quantity">1</p>
              <p className="price">&pound;1,532.33</p>
              <p className="total">&pound;1,532.33</p>
            </li>

            <li className="individual-item">
              <p className="name">New Logo</p>
              <p className="quantity">1</p>
              <p className="price">&pound;1,532.33</p>
              <p className="total">&pound;1,532.33</p>
            </li>
          </ul>
        </div>

        <div className="amount-due">
          <p className="due">Amount Due</p>
          <h2 className="grand-total">&pound;4,032.33</h2>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default InvoiceDetails;

const StyledWrapper = styled.section`
  background-color: #ffffff;
  margin-top: 30px;
  padding: 25px;
  border-radius: 8px;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-side {
      h2 {
        font-size: 18px;

        span {
          color: #7e88c3;
        }
      }

      .description {
        margin-top: 5px;
        font-size: 12px;
        color: #888eb0;
      }
    }

    .right-side {
      p {
        font-size: 12px;
        color: #888eb0;
        text-align: right;

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
      width: 33%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        font-size: 12px;
        color: #888eb0;
      }

      h2 {
        margin-top: 10px;
        font-size: 15px;
      }
    }

    .billing-details {
      width: 33%;

      p {
        color: #888eb0;
        font-size: 12px;

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
      }
    }

    .sent-details {
      width: 33%;

      p {
        color: #888eb0;
        font-size: 12px;
      }

      h2 {
        margin-top: 10px;
        font-size: 15px;
        word-wrap: break-word;
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

      .header-labels {
        display: flex;

        p {
          color: #888eb0;
          font-size: 12px;

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
            color: #888eb0;
            font-size: 12px;
            font-weight: 700;

            &.name {
              flex: 0.8;
              color: #000000;
            }

            &.quantity,
            &.price {
              flex: 0.4;
              text-align: center;
            }

            &.total {
              flex: 0.8;
              text-align: right;
              color: #000000;
            }
          }
        }
      }
    }

    .amount-due {
      padding: 30px 40px;
      background-color: #373b53;
      display: flex;
      align-items: center;
      justify-content: space-between;

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
`;
