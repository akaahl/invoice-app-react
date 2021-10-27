import React from "react";
import styled from "styled-components";
import InnerForm from "./InnerForm";
import { useDispatch } from "react-redux";
import { closeModal } from "../../actions/dataActions";

const FormWrapper = () => {
  const dispatch = useDispatch();

  return (
    <StyledFormWrapper onClick={(e) => dispatch(closeModal())}>
      <InnerForm />
    </StyledFormWrapper>
  );
};

export default FormWrapper;

const StyledFormWrapper = styled.aside`
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
`;
