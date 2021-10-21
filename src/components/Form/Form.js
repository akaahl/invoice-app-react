import React from "react";
import styled from "styled-components";

const Form = () => {
  return (
    <StyledForm>
      <header>
        <h1>Create Invoice</h1>
      </header>

      <main>
        <fieldset>
          <legend>Bill From</legend>

          <div className="input-wrapper">
            <label htmlFor="street-address">Street Address</label>
            <input type="text" id="street-address" name="street-address" />
          </div>

          <div className="addresses">
            <div className="input-wrapper">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" />
            </div>

            <div className="input-wrapper">
              <label htmlFor="postCode">Post Code</label>
              <input type="text" id="postCode" name="postCode" />
            </div>

            <div className="input-wrapper">
              <label htmlFor="country">Country</label>
              <input type="text" id="country" name="country" />
            </div>
          </div>
        </fieldset>
      </main>
    </StyledForm>
  );
};

export default Form;

const StyledForm = styled.form`
  height: 100%;
  width: 750px;
  background-color: #ffffff;
  padding: 60px 40px 30px 160px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;

  main {
    width: 100%;
    margin-top: 40px;
    padding-right: 40px !important;
    overflow-y: scroll;

    fieldset {
      border: 0;

      legend {
        font-size: 12px;
        font-weight: 600;
        color: #7c5dfa;
      }

      .addresses {
        display: flex;

        .input-wrapper {
          flex: 0.1 !important;
          margin-right: 15px;
        }
      }

      .input-wrapper {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        /* width: 100%; */

        &.addresses {
          flex-direction: row;

          &.addresses-wrapper {
            display: flex;
            flex-direction: column;
            width: 10%;
            flex: 0.1;
          }
        }

        label {
          font-size: 12px;
          color: #7e88c3;
        }

        input[type="text"] {
          margin-top: 10px;
          padding: 15px;
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
`;
