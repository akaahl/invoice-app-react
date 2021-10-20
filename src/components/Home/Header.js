import React, { useState } from "react";
import styled from "styled-components";
import arrowIcon from "../../assets/images/icon-arrow-down.svg";
import plusIcon from "../../assets/images/icon-plus.svg";
import checkIcon from "../../assets/images/icon-check.svg";

const Header = () => {
  const [modal, setModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const closeModal = (e) => {
    e.preventDefault();
    setModal(false);
    document.removeEventListener("click", closeModal);
  };

  const handleModal = (e) => {
    e.stopPropagation();

    if (modal) {
      setModal(false);
    } else {
      setModal(true);
      document.addEventListener("click", closeModal);
    }
  };

  const handleFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <StyledHeader>
      <div className="left-side">
        <h1>Invoices</h1>
        <p>There are 7 total invoices.</p>
      </div>

      <div className="right-side">
        <div className="filter-wrapper">
          <button className="filter-btn" onClick={handleModal}>
            Filter by status
            <img
              src={arrowIcon}
              alt="arrow"
              className={modal ? "rotate" : ""}
            />
          </button>

          {modal && (
            <div
              className="status-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <label htmlFor="all" className="all">
                <input
                  type="radio"
                  name="filter"
                  id="all"
                  value="all"
                  onChange={handleFilter}
                  checked={filterStatus === "all"}
                />
                <div className="custom-checkbox">
                  <img src={checkIcon} alt="check icon" />
                </div>
                <span>All</span>
              </label>

              <label htmlFor="paid" className="paid">
                <input
                  type="radio"
                  name="filter"
                  id="paid"
                  value="paid"
                  onChange={handleFilter}
                  checked={filterStatus === "paid"}
                />
                <div className="custom-checkbox">
                  <img src={checkIcon} alt="check icon" />
                </div>
                <span>Paid</span>
              </label>

              <label htmlFor="pending">
                <input
                  type="radio"
                  name="filter"
                  id="pending"
                  value="pending"
                  onChange={handleFilter}
                  checked={filterStatus === "pending"}
                />
                <div className="custom-checkbox">
                  <img src={checkIcon} alt="check icon" />
                </div>
                <span>Pending</span>
              </label>

              <label htmlFor="draft">
                <input
                  type="radio"
                  name="filter"
                  id="draft"
                  value="draft"
                  onChange={handleFilter}
                  checked={filterStatus === "draft"}
                />
                <div className="custom-checkbox">
                  <img src={checkIcon} alt="check icon" />
                </div>
                <span>Draft</span>
              </label>
            </div>
          )}
        </div>

        <button className="add-invoice-btn">
          <div className="icon">
            <img src={plusIcon} alt="plus icon" />
          </div>
          New Invoice
        </button>
      </div>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left-side {
    h1 {
      font-size: 30px;
    }
    p {
      color: #888eb0;
      margin-top: 10px;
      font-size: 12px;
    }
  }

  .right-side {
    display: flex;
    align-items: center;
    .filter-wrapper {
      position: relative;
      margin-right: 20px;

      .filter-btn {
        border: none;
        padding: 10px;
        background: none;
        color: #000000;
        font-weight: 700;
        font-size: 12px;
        display: flex;
        align-items: center;
        cursor: pointer;

        img {
          margin-left: 10px;
          transition: transform 0.2s ease-in-out;

          &.rotate {
            transform: rotate(-180deg);
          }
        }
      }

      .status-wrapper {
        position: absolute;
        background-color: #ffffff;
        top: 60px;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
        width: 180px;

        label {
          display: block;

          cursor: pointer;
          display: flex;

          &:hover {
            .custom-checkbox {
              border: 1px solid #7c5dfa;
            }
          }

          &:not(:first-child) {
            margin-top: 8px;
          }

          input[type="radio"] {
            display: none;

            &:checked ~ .custom-checkbox {
              background-color: #7c5dfa;

              img {
                transform: scale(1);
              }
            }
          }

          .custom-checkbox {
            height: 17px;
            width: 17px;
            border-radius: 3px;
            background-color: #dfe3fa;
            border: 1px solid transparent;
            transition: all 0.2 ease-in-out;
            display: grid;
            place-items: center;
            margin-right: 15px;
            transition: all 0.2s ease-in-out;

            img {
              transform: scale(0);
              transition: all 0.4s ease-in-out;
            }
          }

          span {
            font-size: 12px;
            font-weight: 700;
            line-height: 1.5;
          }
        }
      }
    }

    .add-invoice-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: none;
      background-color: #7c5dfa;
      padding: 8px 14px 8px 7px;
      border: none;
      border-radius: 25px;
      color: #ffffff;
      font-weight: 700;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #9277ff;
      }

      .icon {
        display: grid;
        place-items: center;
        padding: 9px;
        border-radius: 50%;
        background-color: #ffffff;
        margin-right: 10px;
      }
    }
  }
`;
