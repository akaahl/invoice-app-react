import React, { useState, useEffect } from 'react';
import arrowIcon from '../../assets/images/icon-arrow-down.svg';
import { ReactComponent as CheckIcon } from '../../assets/images/icon-check.svg';
import { generatePaymentTerms } from '../../utils';
import { motion, AnimatePresence } from 'framer-motion';

const SelectOptions = ({ values, setFieldValue, selectedPaymentTerms }) => {
  const { paymentTerms } = values;
  const [termsModal, setTermsModal] = useState(false);

  useEffect(() => {
    if (selectedPaymentTerms)
      setFieldValue('paymentTerms', generatePaymentTerms(selectedPaymentTerms));
  }, [selectedPaymentTerms, setFieldValue]);

  const handlePaymentTerms = (value, setFieldValue, textContent) => {
    if (textContent !== value) {
      setFieldValue('paymentTerms', textContent);
    }
  };

  const closeTermsModal = e => {
    e.preventDefault();
    e.stopPropagation();
    setTermsModal(false);
    document.removeEventListener('click', closeTermsModal);
  };

  const handleTermsModal = e => {
    e.preventDefault();
    e.stopPropagation();

    if (!termsModal) {
      setTermsModal(true);
      document.addEventListener('click', closeTermsModal);
    } else {
      setTermsModal(false);
    }
  };

  const selectOptionsVariants = {
    initial: {
      y: -50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -50,
      opacity: 0,
    },
  };

  return (
    <div className="input-wrapper payment-terms">
      <label htmlFor="paymentTerms">Payment Terms</label>

      <div
        className="payment-terms-wrapper"
        onClick={handleTermsModal}
        onKeyPress={e => {
          if (e.code === 'Enter') handleTermsModal(e);
        }}
        role="button"
        tabIndex="0"
      >
        <span>{paymentTerms}</span>
        <img src={arrowIcon} alt="arrow icon" />

        <AnimatePresence>
          {termsModal && (
            <motion.div
              className="select-options"
              onClick={e => e.stopPropagation()}
              variants={selectOptionsVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p
                onClick={e => {
                  const textContent = e.target.textContent;
                  handlePaymentTerms(paymentTerms, setFieldValue, textContent);
                  setTermsModal(false);
                }}
                onKeyPress={e => {
                  if (e.code === 'Enter') {
                    handlePaymentTerms(
                      paymentTerms,
                      setFieldValue,
                      'Net 1 Day'
                    );
                    setTermsModal(false);
                  }
                }}
                className={paymentTerms === 'Net 1 Day' ? 'selected' : ''}
                role="button"
                tabIndex="0"
              >
                Net 1 Day
                <CheckIcon />
              </p>
              <p
                onClick={e => {
                  const textContent = e.target.textContent;
                  handlePaymentTerms(paymentTerms, setFieldValue, textContent);
                  setTermsModal(false);
                }}
                onKeyPress={e => {
                  if (e.code === 'Enter') {
                    handlePaymentTerms(
                      paymentTerms,
                      setFieldValue,
                      'Net 7 Days'
                    );
                    setTermsModal(false);
                  }
                }}
                className={paymentTerms === 'Net 7 Days' ? 'selected' : ''}
                role="button"
                tabIndex="0"
              >
                Net 7 Days
                <CheckIcon />
              </p>
              <p
                onClick={e => {
                  const textContent = e.target.textContent;
                  handlePaymentTerms(paymentTerms, setFieldValue, textContent);
                  setTermsModal(false);
                }}
                onKeyPress={e => {
                  if (e.code === 'Enter') {
                    handlePaymentTerms(
                      paymentTerms,
                      setFieldValue,
                      'Net 14 Days'
                    );
                    setTermsModal(false);
                  }
                }}
                className={paymentTerms === 'Net 14 Days' ? 'selected' : ''}
                role="button"
                tabIndex="0"
              >
                Net 14 Days
                <CheckIcon />
              </p>
              <p
                onClick={e => {
                  const textContent = e.target.textContent;
                  handlePaymentTerms(paymentTerms, setFieldValue, textContent);
                  setTermsModal(false);
                }}
                onKeyPress={e => {
                  if (e.code === 'Enter') {
                    handlePaymentTerms(
                      paymentTerms,
                      setFieldValue,
                      'Net 30 Days'
                    );
                    setTermsModal(false);
                  }
                }}
                className={paymentTerms === 'Net 30 Days' ? 'selected' : ''}
                role="button"
                tabIndex="0"
              >
                Net 30 Days
                <CheckIcon />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SelectOptions;
