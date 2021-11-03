import React, { useState } from 'react';
import StyledForm from './styles';
import { Formik, Form } from 'formik';
import {
  initialValues,
  validationSchema,
  randomIdGenerator,
  formatDatePicker,
  getTotal,
  generatePayDue,
  generatePaymentTerms,
  compareDate,
} from '../../utils';
import SelectOptions from './SelectOptions.js';
import TextError from './TextError';
import InputWrapper from './InputWrapper';
import ItemList from './ItemList';
import { ConnectedFocusError } from 'focus-formik-error';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, updateData } from '../../actions/dataActions';

const InnerForm = () => {
  const dispatch = useDispatch();
  const [itemListError, setItemListError] = useState(false);
  const params = useSelector(state => state.root.invoiceId);
  const selectedInvoice = JSON.parse(
    localStorage.getItem('invoiceStorage')
  ).filter(invoice => invoice.id === params)[0];

  const handleFormSubmit = values =>
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

    const updatedItemList = itemList.map(item => ({
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
        : 'draft',
      senderAddress,
      clientAddress,
      items: updatedItemList,
      total: getTotal(itemList),
    };

    const invoiceStorage = JSON.parse(localStorage.getItem('invoiceStorage'));

    if (!params) {
      invoiceStorage.unshift(newInvoice);
      localStorage.setItem('invoiceStorage', JSON.stringify(invoiceStorage));
      dispatch(updateData(invoiceStorage));
    } else {
      const newInvoiceStorage = invoiceStorage.map(invoice =>
        invoice.id === params ? { ...newInvoice } : invoice
      );
      localStorage.setItem('invoiceStorage', JSON.stringify(newInvoiceStorage));
      dispatch(updateData(newInvoiceStorage));
    }
    document.body.style.overflowY = 'scroll';
    dispatch(closeModal());
  };

  const handleSubmit = values => {
    if (!itemListError) {
      handleFinalizedSubmit(values, true);
    }
  };

  const innerFormVariants = {
    initial: {
      x: '-100%',
    },
    animate: {
      x: '-4%',
      transition: {
        type: 'spring',
        duration: 0.5,
      },
    },
    exit: {
      x: '-100%',
      transition: {
        type: 'spring',
        duration: 0.5,
      },
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={values => handleSubmit(values)}
    >
      {formik => {
        const { touched, errors, setFieldValue, values, isValid } = formik;

        return (
          <StyledForm
            onClick={e => e.stopPropagation()}
            params={params}
            variants={innerFormVariants}
          >
            <Form>
              <ConnectedFocusError />
              <header>
                <h1>Create Invoice</h1>
              </header>

              <main>
                <fieldset className="bill-from">
                  <legend>Bill From</legend>

                  <InputWrapper
                    classname="street-address"
                    textContent="Street Address"
                    name="streetAddress"
                    errors={errors}
                    touched={touched}
                    value={
                      selectedInvoice
                        ? selectedInvoice.senderAddress.street
                        : ''
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
                      selectedInvoice ? selectedInvoice.senderAddress.city : ''
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
                        : ''
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
                      selectedInvoice
                        ? selectedInvoice.senderAddress.country
                        : ''
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
                    value={selectedInvoice ? selectedInvoice.clientName : ''}
                    setFieldValue={setFieldValue}
                  />

                  <InputWrapper
                    classname="client-email"
                    textContent="Client's Email"
                    name="clientEmail"
                    errors={errors}
                    touched={touched}
                    value={selectedInvoice ? selectedInvoice.clientEmail : ''}
                    setFieldValue={setFieldValue}
                  />

                  <InputWrapper
                    classname="client-street-address"
                    textContent="Street Address"
                    name="clientStreetAddress"
                    errors={errors}
                    touched={touched}
                    value={
                      selectedInvoice
                        ? selectedInvoice.clientAddress.street
                        : ''
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
                      selectedInvoice ? selectedInvoice.clientAddress.city : ''
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
                        : ''
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
                      selectedInvoice
                        ? selectedInvoice.clientAddress.country
                        : ''
                    }
                    setFieldValue={setFieldValue}
                  />

                  <div className="dates">
                    <InputWrapper
                      classname="invoice-date"
                      textContent="Invoice Date"
                      name="invoiceDate"
                      selectedDate={
                        selectedInvoice ? selectedInvoice.createdAt : ''
                      }
                      setFieldValue={setFieldValue}
                    />

                    <SelectOptions
                      values={values}
                      setFieldValue={setFieldValue}
                      selectedPaymentTerms={
                        selectedInvoice ? selectedInvoice.paymentTerms : ''
                      }
                    />
                  </div>

                  <InputWrapper
                    classname="description"
                    textContent="Description"
                    name="description"
                    errors={errors}
                    touched={touched}
                    value={selectedInvoice ? selectedInvoice.description : ''}
                    setFieldValue={setFieldValue}
                  />

                  <div className="item-list-wrapper">
                    <h4>Item List</h4>

                    <ItemList
                      errors={errors}
                      touched={touched}
                      setItemListError={setItemListError}
                      selectedItems={
                        selectedInvoice ? selectedInvoice.items : ''
                      }
                      setFieldValue={setFieldValue}
                    />

                    <div className="error-messages">
                      {itemListError && (
                        <TextError text="At least one item must be added" />
                      )}

                      {!isValid && (
                        <TextError text="All fields must be filled" />
                      )}
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
                    document.body.style.overflowY = 'scroll';
                  }}
                >
                  Discard
                </button>
                <button
                  type="button"
                  className="draft-btn"
                  onClick={e => {
                    e.preventDefault();
                    handleFinalizedSubmit(values);
                  }}
                >
                  <span className="desktop">Save as Draft</span>
                  <span className="mobile">Draft</span>
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  onClick={e => handleFormSubmit(values)}
                >
                  <span className="desktop">Save &amp; Send</span>
                  <span className="mobile">Send</span>
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    dispatch(closeModal());
                    document.body.style.overflowY = 'scroll';
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
            </Form>
          </StyledForm>
        );
      }}
    </Formik>
  );
};

export default InnerForm;
