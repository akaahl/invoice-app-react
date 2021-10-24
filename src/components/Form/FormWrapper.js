import React from "react";
import styled from "styled-components";
import InnerForm from "./InnerForm";

const FormWrapper = () => {
  return (
    <StyledFormWrapper>
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
