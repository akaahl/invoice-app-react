import React from 'react';
import styled from 'styled-components';
import emptyIcon from '../../assets/images/illustration-empty.svg';

const EmptyInvoice = ({ filterStatus }) => {
  return (
    <StyledWrapper>
      <img src={emptyIcon} alt="empty invoice illustration" />
      <p>
        Currently, there are no{' '}
        {filterStatus === 'paid'
          ? 'paid'
          : filterStatus === 'pending'
          ? 'pending'
          : filterStatus === 'draft'
          ? 'draft'
          : ''}{' '}
        invoices. Click or press the "New Invoice" button to create a new one.
      </p>
    </StyledWrapper>
  );
};

export default EmptyInvoice;

const StyledWrapper = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;

  p {
    color: ${({ theme }) => theme.font};
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    margin-top: 40px;
    width: 50%;
    transition: color 0.2s ease-in-out;
  }

  @media (max-width: 375px) {
    p {
      width: 70%;
    }
  }

  @media (min-height: 800px) {
    margin-top: 150px;
  }

  @media (min-height: 1024px) {
    margin-top: 200px;
  }

  @media (min-height: 1300px) {
    margin-top: 350px;
  }
`;
