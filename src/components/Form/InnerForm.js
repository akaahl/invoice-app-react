import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import {
  initialValues,
  validationSchema,
  randomIdGenerator,
  formatDatePicker,
  getTotal,
  generatePayDue,
  generatePaymentTerms,
  compareDate,
} from "../../utils";
import SelectOptions from "./SelectOptions.js";
import TextError from "./TextError";
import InputWrapper from "./InputWrapper";
import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateData } from "../../actions/dataActions";

const InnerForm = () => {
  const dispatch = useDispatch();
  const [itemListError, setItemListError] = useState(false);
  const mainRef = useRef().current;
  const params = useSelector((state) => state.root.invoiceId);
  const selectedInvoice = JSON.parse(
    localStorage.getItem("invoiceStorage")
  ).filter((invoice) => invoice.id === params)[0];

  // console.log(selectedInvoice);

  const handleFormSubmit = (values) =>
    !values.itemList.length ? setItemListError(true) : setItemListError(false);

  const handleFinalizedSubmit = (values, send) => {
    const {
      streetAddress,
      city,
      postCode,
      country,
      clientName,
      clientEmail,
      clientStreetAddress,
      clientCity,
      clientPostCode,
      clientCountry,
      invoiceDate,
      paymentTerms,
      description,
      itemList,
    } = values;

    const senderAddress = {
      street: streetAddress,
      city,
      postCode,
      country,
    };

    const clientAddress = {
      street: clientStreetAddress,
      city: clientCity,
      postCode: clientPostCode,
      country: clientCountry,
    };

    const updatedItemList = itemList.map((item) => ({
      ...item,
      total: item.price * item.quantity,
    }));

    const newInvoice = {
      id: params ? params : randomIdGenerator(),
      createdAt: formatDatePicker(invoiceDate),
      paymentDue: generatePayDue(
        formatDatePicker(invoiceDate),
        generatePaymentTerms(paymentTerms)
      ),
      description,
      paymentTerms: generatePaymentTerms(paymentTerms),
      clientName,
      clientEmail,
      status: send
        ? compareDate(
            generatePayDue(
              formatDatePicker(invoiceDate),
              generatePaymentTerms(paymentTerms)
            ),
            new Date()
          )
        : "draft",
      senderAddress,
      clientAddress,
      items: updatedItemList,
      total: getTotal(itemList),
    };

    const invoiceStorage = JSON.parse(localStorage.getItem("invoiceStorage"));

    if (!params) {
      invoiceStorage.unshift(newInvoice);
      localStorage.setItem("invoiceStorage", JSON.stringify(invoiceStorage));
      dispatch(updateData(invoiceStorage));
      dispatch(closeModal());
      document.body.style.overflowY = "scroll";
    } else {
      const newInvoiceStorage = invoiceStorage.map((invoice) =>
        invoice.id === params ? { ...newInvoice } : invoice
      );
      localStorage.setItem("invoiceStorage", JSON.stringify(newInvoiceStorage));
      dispatch(updateData(newInvoiceStorage));
      dispatch(closeModal());

      // console.log(newInvoiceStorage);
    }
  };

  const handleSubmit = (values) => {
    if (!itemListError) {
      handleFinalizedSubmit(values, true);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={(values) => handleSubmit(values)}
    >
      {(formik) => {
        const { touched, errors, setFieldValue, values, isValid } = formik;
        // console.log(formik);

        return (
          <StyledForm
            as={Form}
            onClick={(e) => e.stopPropagation()}
            params={params}
          >
            <header>
              <h1>Create Invoice</h1>
            </header>

            <main ref={mainRef}>
              <fieldset className="bill-from">
                <legend>Bill From</legend>

                <InputWrapper
                  classname="street-address"
                  textContent="Street Address"
                  name="streetAddress"
                  errors={errors}
                  touched={touched}
                  value={
                    selectedInvoice ? selectedInvoice.senderAddress.street : ""
                  }
                  setFieldValue={setFieldValue}
                />

                <InputWrapper
                  classname="city"
                  textContent="City"
                  name="city"
                  errors={errors}
                  touched={touched}
                  value={
                    selectedInvoice ? selectedInvoice.senderAddress.city : ""
                  }
                  setFieldValue={setFieldValue}
                />

                <InputWrapper
                  classname="post-code"
                  textContent="Post Code"
                  name="postCode"
                  errors={errors}
                  touched={touched}
                  value={
                    selectedInvoice
                      ? selectedInvoice.senderAddress.postCode
                      : ""
                  }
                  setFieldValue={setFieldValue}
                />

                <InputWrapper
                  classname="country"
                  textContent="Country"
                  name="country"
                  errors={errors}
                  touched={touched}
                  value={
                    selectedInvoice ? selectedInvoice.senderAddress.country : ""
                  }
                  setFieldValue={setFieldValue}
                />
              </fieldset>

              <fieldset className="bill-to">
                <legend>Bill To</legend>

                <InputWrapper
                  classname="client-name"
                  textContent="Client's Name"
                  name="clientName"
                  errors={errors}
                  touched={touched}
                  value={selectedInvoice ? selectedInvoice.clientName : ""}
                  setFieldValue={setFieldValue}
                />

                <InputWrapper
                  classname="client-email"
                  textContent="Client's Email"
                  name="clientEmail"
                  errors={errors}
                  touched={touched}
                  value={selectedInvoice ? selectedInvoice.clientEmail : ""}
                  setFieldValue={setFieldValue}
                />

                <InputWrapper
                  classname="client-street-address"
                  textContent="Street Address"
                  name="clientStreetAddress"
                  errors={errors}
                  touched={touched}
                  value={
                    selectedInvoice ? selectedInvoice.clientAddress.street : ""
                  }
                  setFieldValue={setFieldValue}
                />

                <InputWrapper
                  classname="client-city"
                  textContent="Client City"
                  name="clientCity"
                  errors={errors}
                  touched={touched}
                  value={
                    selectedInvoice ? selectedInvoice.clientAddress.city : ""
                  }
                  setFieldValue={setFieldValue}
                />

                <InputWrapper
                  classname="client-post-code"
                  textContent="Post Code"
                  name="clientPostCode"
                  errors={errors}
                  touched={touched}
                  value={
                    selectedInvoice
                      ? selectedInvoice.clientAddress.postCode
                      : ""
                  }
                  setFieldValue={setFieldValue}
                />

                <InputWrapper
                  classname="client-country"
                  textContent="Country"
                  name="clientCountry"
                  errors={errors}
                  touched={touched}
                  value={
                    selectedInvoice ? selectedInvoice.clientAddress.country : ""
                  }
                  setFieldValue={setFieldValue}
                />

                <div className="dates">
                  <InputWrapper
                    classname="invoice-date"
                    textContent="Invoice Date"
                    name="invoiceDate"
                    selectedDate={
                      selectedInvoice ? selectedInvoice.createdAt : ""
                    }
                    // setFieldValue={setFieldValue}
                  />

                  <SelectOptions
                    values={values}
                    setFieldValue={setFieldValue}
                    selectedPaymentTerms={
                      selectedInvoice ? selectedInvoice.paymentTerms : ""
                    }
                  />
                </div>

                <InputWrapper
                  classname="description"
                  textContent="Description"
                  name="description"
                  errors={errors}
                  touched={touched}
                  value={selectedInvoice ? selectedInvoice.description : ""}
                  setFieldValue={setFieldValue}
                />

                <div className="item-list-wrapper">
                  <h4>Item List</h4>

                  <ItemList
                    errors={errors}
                    touched={touched}
                    setItemListError={setItemListError}
                    selectedItems={selectedInvoice ? selectedInvoice.items : ""}
                    setFieldValue={setFieldValue}
                  />

                  <div className="error-messages">
                    {itemListError && (
                      <TextError text="At least one item must be added" />
                    )}

                    {!isValid && <TextError text="All fields must be filled" />}
                  </div>
                </div>
              </fieldset>
            </main>

            <footer>
              <button
                type="button"
                className="discard-btn"
                onClick={() => {
                  dispatch(closeModal());
                  document.body.style.overflowY = "scroll";
                }}
              >
                Discard
              </button>
              <button
                type="button"
                className="draft-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleFinalizedSubmit(values);
                }}
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="submit-btn"
                onClick={(e) => handleFormSubmit(values)}
              >
                Save &amp; Send
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  dispatch(closeModal());
                  document.body.style.overflowY = "scroll";
                }}
              >
                Cancel
              </button>
              <button
                className="save-changes-btn"
                type="submit"
                onClick={() => handleFormSubmit(values)}
              >
                Save Changes
              </button>
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
    display: ${({ params }) => (params ? "flex" : "grid")};
    justify-content: ${({ params }) => (params ? "flex-end" : "")};
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
        display: ${({ params }) => (params ? "none" : "block")};
        grid-area: discard;
        color: #7e88c3;

        &:hover {
          background-color: #dfe3fa;
        }
      }

      &.draft-btn {
        display: ${({ params }) => (params ? "none" : "block")};
        grid-area: draft;
        margin-right: 10px;
        background-color: #363b53;
        color: #7e88c3;

        &:hover {
          background-color: #000000;
        }
      }

      &.submit-btn {
        display: ${({ params }) => (params ? "none" : "block")};
        grid-area: submit;
        background-color: #7c5dfa;
        color: #ffffff;

        &:hover {
          background-color: #9277ff;
        }
      }

      &.cancel-btn {
        display: ${({ params }) => (params ? "block" : "none")};
        margin-right: 15px;
        padding: 15px 25px;
        color: #7c5dfa;

        &:hover {
          background-color: #dfe3fa;
        }
      }

      &.save-changes-btn {
        display: ${({ params }) => (params ? "block" : "none")};
        padding: 15px 25px;
        background-color: #7c5dfa;
        color: #ffffff;

        &:hover {
          background-color: #9277ff;
        }
      }
    }
  }
`;
