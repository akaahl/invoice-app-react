import React, { useState } from "react";
import arrowIcon from "../../assets/images/icon-arrow-down.svg";
import checkIcon from "../../assets/images/icon-check.svg";

const SelectOptions = ({ values, setFieldValue }) => {
  const { paymentTerms } = values;
  const [termsModal, setTermsModal] = useState(false);

  const handlePaymentTerms = (value, setFieldValue, textContent) => {
    if (textContent !== value) {
      setFieldValue("paymentTerms", textContent);
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

  return (
    <div className="input-wrapper payment-terms">
      <label htmlFor="paymentTerms">Payment Terms</label>

      <div className="payment-terms-wrapper" onClick={handleTermsModal}>
        <span>{paymentTerms}</span>
        <img src={arrowIcon} alt="arrow icon" />

        {termsModal && (
          <div className="select-options" onClick={(e) => e.stopPropagation()}>
            <p
              onClick={(e) => {
                const textContent = e.target.textContent;
                handlePaymentTerms(paymentTerms, setFieldValue, textContent);
              }}
              className={paymentTerms === "Net 1 Day" ? "selected" : ""}
            >
              Net 1 Day
              <img src={checkIcon} alt="check icon" />
            </p>
            <p
              onClick={(e) => {
                const textContent = e.target.textContent;
                handlePaymentTerms(paymentTerms, setFieldValue, textContent);
              }}
              className={paymentTerms === "Net 7 Days" ? "selected" : ""}
            >
              Net 7 Days
              <img src={checkIcon} alt="check icon" />
            </p>
            <p
              onClick={(e) => {
                const textContent = e.target.textContent;
                handlePaymentTerms(paymentTerms, setFieldValue, textContent);
              }}
              className={paymentTerms === "Net 14 Days" ? "selected" : ""}
            >
              Net 14 Days
              <img src={checkIcon} alt="check icon" />
            </p>
            <p
              onClick={(e) => {
                const textContent = e.target.textContent;
                handlePaymentTerms(paymentTerms, setFieldValue, textContent);
              }}
              className={paymentTerms === "Net 30 Days" ? "selected" : ""}
            >
              Net 30 Days
              <img src={checkIcon} alt="check icon" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectOptions;