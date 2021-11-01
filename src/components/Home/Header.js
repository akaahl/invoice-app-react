import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import arrowIcon from '../../assets/images/icon-arrow-down.svg';
import plusIcon from '../../assets/images/icon-plus.svg';
import { ReactComponent as CheckIcon } from '../../assets/images/icon-check.svg';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../actions/dataActions';

const Header = ({ filterStatus, setFilterStatus }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const data = useSelector(state => state.root.data);

  const closeModal = e => {
    e.preventDefault();
    setModal(false);
    document.removeEventListener('click', closeModal);
  };

  const handleModal = e => {
    e.stopPropagation();

    if (modal) {
      setModal(false);
    } else {
      setModal(true);
      document.addEventListener('click', closeModal);
    }
  };

  const handleFilter = e => {
    setFilterStatus(e.target.value);
  };

  useEffect(() => {
    return () => setModal(false);
  }, []);

  return (
    <StyledHeader>
      <div className="left-side">
        <h1>Invoices</h1>
        <p>There are {data.length} total invoices.</p>
      </div>

      <div className="right-side">
        <div className="filter-wrapper">
          <button className="filter-btn" onClick={handleModal}>
            <span className="desktop">Filter by status</span>
            <span className="mobile">Filter</span>
            <img
              src={arrowIcon}
              alt="arrow"
              className={modal ? 'rotate' : ''}
            />
          </button>

          {modal && (
            <div className="status-wrapper" onClick={e => e.stopPropagation()}>
              <label htmlFor="all" className="all">
                <input
                  type="radio"
                  name="filter"
                  id="all"
                  value="all"
                  onChange={handleFilter}
                  checked={filterStatus === 'all'}
                />
                <div
                  className="custom-checkbox"
                  role="button"
                  tabIndex="0"
                  onKeyPress={e => {
                    if (e.code === 'Enter') setFilterStatus('all');
                  }}
                >
                  <CheckIcon />
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
                  checked={filterStatus === 'paid'}
                />
                <div
                  className="custom-checkbox"
                  role="button"
                  tabIndex="0"
                  onKeyPress={e => {
                    if (e.code === 'Enter') setFilterStatus('paid');
                  }}
                >
                  <CheckIcon />
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
                  checked={filterStatus === 'pending'}
                />
                <div
                  className="custom-checkbox"
                  role="button"
                  tabIndex="0"
                  onKeyPress={e => {
                    if (e.code === 'Enter') setFilterStatus('pending');
                  }}
                >
                  <CheckIcon />
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
                  checked={filterStatus === 'draft'}
                />
                <div
                  className="custom-checkbox"
                  role="button"
                  tabIndex="0"
                  onKeyPress={e => {
                    if (e.code === 'Enter') setFilterStatus('draft');
                  }}
                >
                  <CheckIcon />
                </div>
                <span>Draft</span>
              </label>
            </div>
          )}
        </div>

        <button
          className="add-invoice-btn"
          onClick={() => {
            dispatch(openModal());
            document.body.style.overflowY = 'hidden';
          }}
        >
          <div className="icon">
            <img src={plusIcon} alt="plus icon" />
          </div>
          <span>New Invoice</span>
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
      color: ${({ theme }) => theme.font};
    }
    p {
      color: ${({ theme }) => theme.text};
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
        color: ${({ theme }) => theme.font};
        font-weight: 700;
        font-size: 12px;
        display: flex;
        align-items: center;
        cursor: pointer;

        span {
          &.mobile {
            display: none;
          }
        }

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
        background-color: ${({ theme }) => theme.status};
        top: 60px;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
        width: 180px;

        label {
          display: block;
          color: ${({ theme }) => theme.font};
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

          input[type='radio'] {
            display: none;

            &:checked ~ .custom-checkbox {
              background-color: #7c5dfa;

              svg {
                transform: scale(1);
              }
            }
          }

          .custom-checkbox {
            height: 17px;
            width: 17px;
            border-radius: 3px;
            background-color: ${({ theme }) => theme.checkbox};
            border: 1px solid transparent;
            transition: all 0.2 ease-in-out;
            display: grid;
            place-items: center;
            margin-right: 15px;
            transition: all 0.2s ease-in-out;

            svg {
              transform: scale(0);
              transition: all 0.4s ease-in-out;

              path {
                stroke: #ffffff;
              }
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
      transition: background-color 0.2s ease-in-out;

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

  @media (max-width: 768px) {
    .right-side {
      .add-invoice-btn {
        padding: 8px;
        border-radius: 5px;

        .icon {
          margin-right: 0;
          border-radius: 5px;
        }

        span {
          display: none;
        }
      }
    }
  }

  @media (max-width: 425px) {
    .left-side {
      h1 {
        font-size: 20px;
      }

      p {
        display: none;
      }
    }

    .right-side {
      .filter-wrapper {
        .filter-btn {
          span {
            &.desktop {
              display: none;
            }

            &.mobile {
              display: block;
            }
          }
        }

        .status-wrapper {
          right: -40px;
        }
      }
    }
  }
`;
