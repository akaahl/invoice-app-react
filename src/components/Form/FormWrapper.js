import React from 'react';
import styled from 'styled-components';
import InnerForm from './InnerForm';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/dataActions';
import { motion, AnimatePresence } from 'framer-motion';

const FormWrapper = () => {
  const dispatch = useDispatch();

  const formWrapperVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        when: 'afterChildren',
      },
    },
  };

  return (
    <StyledFormWrapper
      onClick={e => {
        dispatch(closeModal());
        document.body.style.overflowY = 'scroll';
      }}
      variants={formWrapperVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <AnimatePresence>
        <InnerForm />
      </AnimatePresence>
    </StyledFormWrapper>
  );
};

export default FormWrapper;

const StyledFormWrapper = styled(motion.aside)`
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
`;
