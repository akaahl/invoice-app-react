import React from "react";
import styled from "styled-components";
import arrowIcon from "../../assets/images/icon-arrow-down.svg";

const Form = () => {
  return (
    <StyledForm>
      <header>
        <h1>Create Invoice</h1>
      </header>

      <main>
        <fieldset className="bill-from">
          <legend>Bill From</legend>

          <div className="input-wrapper street-address">
            <label htmlFor="street-address">Street Address</label>
            <input type="text" id="street-address" name="street-address" />
          </div>

          <div className="input-wrapper city">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" />
          </div>

          <div className="input-wrapper post-code">
            <label htmlFor="post-code">Post Code</label>
            <input type="text" id="post-code" name="post-code" />
          </div>

          <div className="input-wrapper country">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" />
          </div>
        </fieldset>

        <fieldset className="bill-to">
          <legend>Bill To</legend>

          <div className="input-wrapper client-name">
            <label htmlFor="client-name">Client's Name</label>
            <input type="text" id="client-name" name="client-name" />
          </div>

          <div className="input-wrapper client-email">
            <label htmlFor="client-email">Client's Email</label>
            <input
              type="email"
              name="client-email"
              id="client-email"
              placeholder="e.g. email@example.com"
            />
          </div>

          <div className="input-wrapper client-street-address">
            <label htmlFor="client-street-address">Street Address</label>
            <input
              type="text"
              name="client-street-address"
              id="client-street-address"
            />
          </div>

          <div className="input-wrapper client-city">
            <label htmlFor="client-city">City</label>
            <input type="text" name="client-city" id="client-city" />
          </div>

          <div className="input-wrapper client-post-code">
            <label htmlFor="client-post-code">Post Code</label>
            <input type="text" name="client-post-code" id="client-post-code" />
          </div>

          <div className="input-wrapper client-country">
            <label htmlFor="client-country">Country</label>
            <input type="text" name="client-country" id="client-country" />
          </div>

          <div className="dates">
            <div className="input-wrapper invoice-date">
              <label htmlFor="invoice-date">Invoice Date</label>
              <input type="date" name="invoice-date" id="invoice-date" />
            </div>

            <div className="input-wrapper payment-terms">
              <label htmlFor="payment-terms">Payment Terms</label>

              <div className="payment-terms-wrapper">
                <span>Net 30 Days</span>
                <img src={arrowIcon} alt="arrow icon" />
              </div>
            </div>
          </div>
        </fieldset>
      </main>
    </StyledForm>
  );
};

export default Form;

const StyledForm = styled.form`
  height: 100%;
  width: 700px;
  background-color: #ffffff;
  padding: 60px 40px 30px 110px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  margin-left: 50px;

  main {
    min-width: 100%;
    max-width: 100%;
    height: 400px;
    margin-top: 40px;
    padding-right: 40px;
    overflow-y: scroll;

    fieldset {
      border: 0;

      &.bill-from {
        display: grid;
        grid-template-areas:
          "legend . ."
          "street street street"
          "city postCode country";
      }

      &.bill-to {
        margin-top: 20px;
        display: grid;
        grid-template-areas:
          "legend . ."
          "name name name"
          "email email email"
          "street street street"
          "city postCode country"
          "dates dates dates";

        .input-wrapper {
          &.client-name {
            grid-area: name;
          }

          &.client-email {
            grid-area: email;
          }

          &.client-street-address {
            grid-area: street;
          }

          &.client-city {
            grid-area: city;
          }

          &.client-post-code {
            margin-left: 15px;
            grid-area: postCode;
          }

          &.client-country {
            margin-left: 15px;
            grid-area: country;
          }
        }

        .dates {
          grid-area: dates;
          display: flex;
          justify-content: space-between;

          .invoice-date {
            flex: 0.5;
          }

          .payment-terms {
            margin-left: 20px;
            flex: 0.5;

            .payment-terms-wrapper {
              position: relative;
              padding: 18px 15px;
              border-radius: 5px;
              border: 1px solid rgba(0, 0, 0, 0.1);
              margin-top: 10px;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;

              span {
                color: #000000;
                font-size: 12px;
                font-weight: 700;
              }
            }
          }
        }
      }

      legend {
        font-size: 12px;
        font-weight: 600;
        color: #7c5dfa;
        grid-area: legend;
      }

      .input-wrapper {
        margin-top: 20px;
        display: flex;
        flex-direction: column;

        &.street-address {
          grid-area: street;
        }

        &.city {
          grid-area: city;
        }

        &.post-code {
          grid-area: postCode;
          margin-left: 15px;
        }

        &.country {
          grid-area: country;
          margin-left: 15px;
        }

        label {
          font-size: 12px;
          color: #7e88c3;
        }

        input[type="text"],
        input[type="email"],
        input[type="date"] {
          &::placeholder {
            font-size: 12px;
            font-weight: 700;
            color: rgba(0, 0, 0, 0.3);
          }
          margin-top: 10px;
          padding: 15px;
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          width: calc(100%);
        }
      }
    }
  }
`;
