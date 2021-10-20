import React from "react";
import styled from "styled-components";

const InvoiceDetails = () => {
  return (
    <StyledWrapper>
      <div className="top">
        <div className="left-side">
          <h2>
            <span>#</span>
            XM9141
          </h2>

          <p className="description">Graphic Design</p>
        </div>

        <div className="right-side">
          <p className="street-address">19 Union Terrace</p>
          <p className="city">London</p>
          <p className="post-code">E1 3EZ</p>
          <p className="country">United Kingdom</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default InvoiceDetails;

const StyledWrapper = styled.section`
  background-color: #ffffff;
  margin-top: 30px;
  padding: 20px;
  border-radius: 8px;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-side {
      h2 {
        font-size: 18px;

        span {
          color: #7e88c3;
        }
      }

      .description {
        margin-top: 10px;
        font-size: 12px;
        color: #888eb0;
      }
    }
  }
`;
