import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import arrowIcon from "../../assets/images/icon-arrow-down.svg";
import checkIcon from "../../assets/images/icon-check.svg";
import plusIcon from "../../assets/images/icon-plus.svg";
import calendarIcon from "../../assets/images/icon-calendar.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/icon-delete.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../utils";

const Form = () => {
  const [paymentTerms, setPaymentTerms] = useState("Net 1 Day");
  const [termsModal, setTermsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePaymentTerms = (e) => {
    const textContent = e.target.textContent;

    if (textContent !== paymentTerms) {
      setPaymentTerms((prevText) => textContent);
    }
  };

  const closeTermsModal = (e) => {
    e.preventDefault();
    setTermsModal(false);
    document.removeEventListener("click", closeTermsModal);
  };

  const handleTermsModal = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!termsModal) {
      setTermsModal(true);
      document.addEventListener("click", closeTermsModal);
    } else {
      setTermsModal(false);
    }
  };

  const DatePickerInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <button
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className="custom-date-picker"
      >
        {formatDate(value, true)}
        <img src={calendarIcon} alt="calendar icon" />
      </button>
    );
  });

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
              {/* <input type="date" name="invoice-date" id="invoice-date" /> */}
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                customInput={<DatePickerInput />}
              />
            </div>

            <div className="input-wrapper payment-terms">
              <label htmlFor="payment-terms">Payment Terms</label>

              <div className="payment-terms-wrapper" onClick={handleTermsModal}>
                <span>{paymentTerms}</span>
                <img src={arrowIcon} alt="arrow icon" />

                {termsModal && (
                  <div
                    className="select-options"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p
                      onClick={handlePaymentTerms}
                      className={paymentTerms === "Net 1 Day" ? "selected" : ""}
                    >
                      Net 1 Day
                      <img src={checkIcon} alt="check icon" />
                    </p>
                    <p
                      onClick={handlePaymentTerms}
                      className={
                        paymentTerms === "Net 7 Days" ? "selected" : ""
                      }
                    >
                      Net 7 Days
                      <img src={checkIcon} alt="check icon" />
                    </p>
                    <p
                      onClick={handlePaymentTerms}
                      className={
                        paymentTerms === "Net 14 Days" ? "selected" : ""
                      }
                    >
                      Net 14 Days
                      <img src={checkIcon} alt="check icon" />
                    </p>
                    <p
                      onClick={handlePaymentTerms}
                      className={
                        paymentTerms === "Net 30 Days" ? "selected" : ""
                      }
                    >
                      Net 30 Days
                      <img src={checkIcon} alt="check icon" />
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="input-wrapper description">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="e.g. Graphic Design Service"
            />
          </div>

          <div className="item-list-wrapper">
            <h4>Item List</h4>

            <ul>
              <li>
                <div className="input-wrapper item-name">
                  <label htmlFor="item-name">Item name</label>
                  <input type="text" name="item-name" id="item-name" />
                </div>

                <div className="input-wrapper quantity">
                  <label htmlFor="quantity">Qty.</label>
                  <input type="text" name="quantity" id="quantity" />
                </div>

                <div className="input-wrapper price">
                  <label htmlFor="price">Price</label>
                  <input type="text" name="price" id="price" />
                </div>

                <div className="input-wrapper total">
                  <label htmlFor="total">Total</label>
                  <span>13123</span>
                </div>

                <button>
                  <DeleteIcon />
                </button>
              </li>

              <li>
                <div className="input-wrapper item-name">
                  <label htmlFor="item-name">Item name</label>
                  <input type="text" name="item-name" id="item-name" />
                </div>

                <div className="input-wrapper quantity">
                  <label htmlFor="quantity">Qty.</label>
                  <input type="text" name="quantity" id="quantity" />
                </div>

                <div className="input-wrapper price">
                  <label htmlFor="price">Price</label>
                  <input type="text" name="price" id="price" />
                </div>

                <div className="input-wrapper total">
                  <label htmlFor="total">Total</label>
                  <span>13123</span>
                </div>

                <button>
                  <DeleteIcon />
                </button>
              </li>
            </ul>

            <button className="add-new-btn">
              <img src={plusIcon} alt="plus icon" />
              Add New Item
            </button>
          </div>
        </fieldset>
      </main>

      <footer>
        <button className="discard-btn">Discard</button>
        <button className="draft-btn">Save as Draft</button>
        <button className="submit-btn">Save &amp; Send</button>
      </footer>
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
          "dates dates dates"
          "desc desc desc"
          "item-list item-list item-list";

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

          &.description {
            grid-area: desc;
          }
        }

        .dates {
          grid-area: dates;
          display: flex;
          justify-content: space-between;

          .invoice-date {
            flex: 0.5;

            .custom-date-picker {
              padding: 15px;
              border-radius: 5px;
              border: 1px solid rgba(0, 0, 0, 0.1);
              width: 100%;
              background: none;
              margin-top: 10px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              color: #000000;
              font-size: 12px;
              font-weight: 600;
            }
          }

          .payment-terms {
            margin-left: 20px;
            flex: 0.5;

            .payment-terms-wrapper {
              position: relative;
              padding: 15px;
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
                font-weight: 600;
              }

              .select-options {
                position: absolute;
                bottom: -190px;
                left: 0;
                border-radius: 5px;
                background-color: #ffffff;
                overflow: hidden;
                width: 100%;
                border: 1px solid rgba(0, 0, 0, 0.1);
                cursor: default;

                p {
                  padding: 15px 20px;
                  font-size: 12px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: color 0.2s ease-in-out;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;

                  &:hover {
                    color: #7c5dfa;
                  }

                  &.selected {
                    color: #7c5dfa;

                    img {
                      transform: scale(1);
                    }
                  }

                  img {
                    object-fit: cover;
                    transform: scale(0);
                    transition: all 0.2s ease-in-out;
                  }
                }
              }
            }
          }
        }

        .item-list-wrapper {
          grid-area: item-list;
          margin-top: 40px;

          h4 {
            color: #777f98;
            font-size: 20px;
            font-weight: 700;
          }

          ul {
            list-style: none;

            li {
              display: flex;

              &:not(:first-child) {
                .input-wrapper {
                  margin-top: 0;

                  label {
                    display: none;
                  }
                }

                button {
                  margin-top: 10px;
                }
              }

              .input-wrapper {
                &.item-name {
                  flex: 0.5;
                }

                &.quantity {
                  margin-left: 20px;
                  flex: 0.2;
                }

                &.price {
                  margin-left: 20px;
                  flex: 0.3;
                }

                &.total {
                  margin-left: 20px;
                  flex: 0.1;

                  span {
                    margin-top: 26px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #888eb0;
                  }
                }
              }

              button {
                margin-left: 20px;
                margin-top: 46px;
                border: none;
                background: none;
                cursor: pointer;
                padding: 0px 5px;

                svg {
                  path {
                    transition: all 0.2s ease-in-out;
                  }
                }

                &:hover {
                  svg {
                    path {
                      fill: orangered;
                    }
                  }
                }
              }
            }
          }

          .add-new-btn {
            margin-top: 20px;
            width: 100%;
            padding: 20px 25px;
            border-radius: 25px;
            display: flex;
            justify-content: center;
            color: #7e88c3;
            font-weight: 600;
            font-size: 12px;
            border: none;
            background: none;
            cursor: pointer;
            transition: all 0.3s ease-in-out;

            &:hover {
              background-color: #dfe3fa;
            }

            img {
              margin-right: 5px;
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

          &:focus {
            border: 1px solid #7c5dfa;
          }
          margin-top: 10px;
          padding: 15px;
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          width: calc(100%);
          transition: all 0.2s ease-in-out;
          outline: none;
          color: #000000;
          font-weight: 600;
        }
      }
    }
  }

  footer {
    margin-top: 40px;
    display: grid;
    grid-template-areas: "discard . . . . . draft submit";

    button {
      padding: 17px 15px;
      border-radius: 25px;
      border: none;
      background: none;
      cursor: pointer;
      font-weight: 700;
      font-size: 12px;
      transition: all 0.3s ease-in-out;

      &.discard-btn {
        grid-area: discard;
        color: #7e88c3;

        &:hover {
          background-color: #dfe3fa;
        }
      }

      &.draft-btn {
        grid-area: draft;
        margin-right: 10px;
        background-color: #363b53;
        color: #7e88c3;

        &:hover {
          background-color: #000000;
        }
      }

      &.submit-btn {
        grid-area: submit;
        background-color: #7c5dfa;
        color: #ffffff;

        &:hover {
          background-color: #9277ff;
        }
      }
    }
  }
`;
