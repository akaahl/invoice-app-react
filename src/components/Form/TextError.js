import React from "react";
import styled from "styled-components";

const TextError = ({ text }) => {
  return <StyledTextError>{`- ${text}`}</StyledTextError>;
};

export default TextError;

const StyledTextError = styled.small`
  color: orangered;
  display: block;
  margin-top: 5px;

  &:first-child {
    margin-top: 25px;
  }
`;
