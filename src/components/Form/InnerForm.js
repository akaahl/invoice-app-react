import React from "react";
import styled from "styled-components";
import plusIcon from "../../assets/images/icon-plus.svg";
import DatePickerInput from "./DatePickerInput";
import { ReactComponent as DeleteIcon } from "../../assets/images/icon-delete.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, FieldArray } from "formik";
import { initialValues, validationSchema } from "../../utils";
import SelectOptions from "./SelectOptions.js";

const InnerForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
    >
      {(formik) => {
        const { touched, errors, setFieldValue, values } = formik;
        console.log(formik);
        return (
          <StyledForm as={Form}>
            <header>
              <h1>Create Invoice</h1>
            </header>

            <main>
              <fieldset className="bill-from">
                <legend>Bill From</legend>

                <div className="input-wrapper street-address">
                  <label
                    htmlFor="streetAddress"
                    className={
                      errors.streetAddress && touched.streetAddress
                        ? "error"
                        : ""
                    }
                  >
                    Street Address
                  </label>
                  <Field
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    className={
                      errors.streetAddress && touched.streetAddress
                        ? "error"
                        : ""
                    }
                  />
                </div>

                <div className="input-wrapper city">
                  <label
                    htmlFor="city"
                    className={errors.city && touched.city ? "error" : ""}
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className={errors.city && touched.city ? "error" : ""}
                  />
                </div>

                <div className="input-wrapper post-code">
                  <label
                    htmlFor="postCode"
                    className={
                      errors.postCode && touched.postCode ? "error" : ""
                    }
                  >
                    Post Code
                  </label>
                  <Field
                    type="text"
                    id="postCode"
                    name="postCode"
                    className={
                      errors.postCode && touched.postCode ? "error" : ""
                    }
                  />
                </div>

                <div className="input-wrapper country">
                  <label
                    htmlFor="country"
                    className={errors.country && touched.country ? "error" : ""}
                  >
                    Country
                  </label>
                  <Field
                    type="text"
                    id="country"
                    name="country"
                    className={errors.country && touched.country ? "error" : ""}
                  />
                </div>
              </fieldset>

              <fieldset className="bill-to">
                <legend>Bill To</legend>

                <div className="input-wrapper client-name">
                  <label
                    htmlFor="clientName"
                    className={
                      errors.clientName && touched.clientName ? "error" : ""
                    }
                  >
                    Client's Name
                  </label>
                  <Field
                    type="text"
                    id="clientName"
                    name="clientName"
                    className={
                      errors.clientName && touched.clientName ? "error" : ""
                    }
                  />
                </div>

                <div className="input-wrapper client-email">
                  <label
                    htmlFor="clientEmail"
                    className={
                      errors.clientEmail && touched.clientEmail ? "error" : ""
                    }
                  >
                    Client's Email
                  </label>
                  <Field
                    type="email"
                    name="clientEmail"
                    id="clientEmail"
                    placeholder="e.g. email@example.com"
                    className={
                      errors.clientEmail && touched.clientEmail ? "error" : ""
                    }
                  />
                </div>

                <div className="input-wrapper client-street-address">
                  <label
                    htmlFor="clientStreetAddress"
                    className={
                      errors.clientStreetAddress && touched.clientStreetAddress
                        ? "error"
                        : ""
                    }
                  >
                    Street Address
                  </label>
                  <Field
                    type="text"
                    name="clientStreetAddress"
                    id="clientStreetAddress"
                    className={
                      errors.clientStreetAddress && touched.clientStreetAddress
                        ? "error"
                        : ""
                    }
                  />
                </div>

                <div className="input-wrapper client-city">
                  <label
                    htmlFor="clientCity"
                    className={
                      errors.clientCity && touched.clientCity ? "error" : ""
                    }
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    name="clientCity"
                    id="clientCity"
                    className={
                      errors.clientCity && touched.clientCity ? "error" : ""
                    }
                  />
                </div>

                <div className="input-wrapper client-post-code">
                  <label
                    htmlFor="clientPostCode"
                    className={
                      errors.clientPostCode && touched.clientPostCode
                        ? "error"
                        : ""
                    }
                  >
                    Post Code
                  </label>
                  <Field
                    type="text"
                    name="clientPostCode"
                    id="clientPostCode"
                    className={
                      errors.clientPostCode && touched.clientPostCode
                        ? "error"
                        : ""
                    }
                  />
                </div>

                <div className="input-wrapper client-country">
                  <label
                    htmlFor="clientCountry"
                    className={
                      errors.clientCountry && touched.clientCountry
                        ? "error"
                        : ""
                    }
                  >
                    Country
                  </label>
                  <Field
                    type="text"
                    name="clientCountry"
                    id="clientCountry"
                    className={
                      errors.clientCountry && touched.clientCountry
                        ? "error"
                        : ""
                    }
                  />
                </div>

                <div className="dates">
                  <div className="input-wrapper invoice-date">
                    <label htmlFor="invoice-date">Invoice Date</label>
                    <Field name="invoiceDate">
                      {({ form, field }) => {
                        const { setFieldValue } = form;
                        const { value } = field;

                        return (
                          <DatePicker
                            id="invoiceDate"
                            selected={value}
                            onChange={(date) =>
                              setFieldValue("invoiceDate", date)
                            }
                            dateFormat="yyyy/MM/dd"
                            customInput={<DatePickerInput />}
                          />
                        );
                      }}
                    </Field>
                  </div>

                  <SelectOptions
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <div className="input-wrapper description">
                  <label
                    htmlFor="description"
                    className={
                      errors.description && touched.description ? "error" : ""
                    }
                  >
                    Description
                  </label>
                  <Field
                    type="text"
                    name="description"
                    id="description"
                    placeholder="e.g. Graphic Design Service"
                    className={
                      errors.description && touched.description ? "error" : ""
                    }
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
      }}
    </Formik>
  );
};

export default InnerForm;

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
    height: 70%;
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
              padding: 16px 15px;
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
          &.error {
            color: orangered;
          }

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

          &.error {
            border: 1px solid orangered;
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
