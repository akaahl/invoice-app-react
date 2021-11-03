import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledForm = styled(motion.div)`
  height: 100%;
  width: 700px;
  background-color: ${({ theme }) => theme.bg};
  padding: 60px 40px 30px 110px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  margin-left: 50px;
  transition: background-color 0.2s ease-in-out;

  form {
    height: 105%;
    padding: 0;
  }

  header {
    h1 {
      color: ${({ theme }) => theme.font};
      transition: color 0.2s ease-in-out;
    }
  }

  main {
    min-width: 100%;
    max-width: 100%;
    height: 70%;
    margin-top: 40px;
    padding-right: 40px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #7c5dfa;
      border-radius: 5px;
    }

    fieldset {
      border: 0;

      &.bill-from {
        display: grid;
        grid-template-areas:
          'legend . .'
          'street street street'
          'city postCode country';
      }

      &.bill-to {
        margin-top: 20px;
        display: grid;
        grid-template-areas:
          'legend . .'
          'name name name'
          'email email email'
          'street street street'
          'city postCode country'
          'dates dates dates'
          'desc desc desc'
          'item-list item-list item-list';

        .input-wrapper {
          &.client-name {
            grid-area: name;
          }

          &.client-email {
            grid-area: email;
          }

          &.client-street-address {
            grid-area: street;
          }

          &.client-city {
            grid-area: city;
          }

          &.client-post-code {
            margin-left: 15px;
            grid-area: postCode;
          }

          &.client-country {
            margin-left: 15px;
            grid-area: country;
          }

          &.description {
            grid-area: desc;
          }
        }

        .dates {
          grid-area: dates;
          display: flex;
          justify-content: space-between;

          .invoice-date {
            flex: 0.5;

            .custom-date-picker {
              margin-left: 1px;
              padding: 15px;
              border-radius: 5px;
              border: 1px solid rgba(0, 0, 0, 0.1);
              width: 100%;
              background: none;
              margin-top: 10px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              background-color: ${({ theme }) => theme.invoice};
              color: ${({ theme }) => theme.font};
              font-size: 12px;
              font-weight: 600;
              transition: all 0.2 ease-in-out !important;
              z-index: 10;

              &:focus {
                outline: 1px solid #7c5dfa;
              }
            }
          }

          .payment-terms {
            margin-left: 20px;
            flex: 0.5;

            .payment-terms-wrapper {
              background-color: ${({ theme }) => theme.invoice};
              position: relative;
              padding: 16px 15px;
              border-radius: 5px;
              border: 1px solid rgba(0, 0, 0, 0.1);
              margin-top: 10px;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              transition: all 0.2s ease-in-out;

              &:focus {
                border: 1px solid #7c5dfa;
                outline: none;
              }

              span {
                color: ${({ theme }) => theme.font};
                font-size: 12px;
                font-weight: 600;
              }

              .select-options {
                position: absolute;
                bottom: -190px;
                left: 0;
                border-radius: 5px;
                background-color: ${({ theme }) => theme.invoice};
                overflow: hidden;
                width: 100%;
                border: 1px solid rgba(0, 0, 0, 0.1);
                cursor: default;
                transition: background-color 0.2s ease-in-out;

                p {
                  padding: 15px 20px;
                  font-size: 12px;
                  font-weight: 600;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  color: ${({ theme }) => theme.font};

                  &:focus {
                    background-color: #7c5dfa;
                    color: #ffffff;
                    outline: none;
                    transition: none;
                  }

                  &:hover {
                    color: #7c5dfa;
                    transition: color 0.2s ease-in-out;
                  }

                  &.selected {
                    color: #7c5dfa;

                    &:focus {
                      background-color: #7c5dfa;
                      color: #ffffff;
                      outline: none;
                      transition: none;

                      svg {
                        path {
                          stroke: #ffffff;
                        }
                      }
                    }

                    svg {
                      transform: scale(1);
                    }
                  }

                  svg {
                    transform: scale(0);
                    transition: all 0.2s ease-in-out;
                  }
                }
              }
            }
          }
        }

        .item-list-wrapper {
          grid-area: item-list;
          margin-top: 40px;

          h4 {
            color: #777f98;
            font-size: 20px;
            font-weight: 700;
          }

          ul {
            list-style: none;

            li {
              display: flex;

              &:not(:first-child) {
                .input-wrapper {
                  margin-top: 0;

                  label {
                    display: none;
                  }
                }

                button {
                  margin-top: 10px;
                }
              }

              .input-wrapper {
                &.item-name {
                  flex: 0.5;
                }

                &.quantity {
                  margin-left: 20px;
                  flex: 0.2;
                }

                &.price {
                  margin-left: 20px;
                  flex: 0.3;
                }

                &.total {
                  margin-left: 20px;
                  flex: 0.1;

                  span {
                    margin-top: 26px;
                    font-size: 12px;
                    font-weight: 600;
                    color: ${({ theme }) => theme.text};
                    transition: color 0.2s ease-in-out;
                  }
                }
              }

              button {
                margin-left: 20px;
                margin-top: 46px;
                border: 1px solid transparent;
                border-radius: 3px;
                background: none;
                cursor: pointer;
                padding: 0px 5px;
                transition: border 0.2s ease-in-out;

                &:focus {
                  border: 1px solid #7c5dfa;
                  outline: none;
                }

                svg {
                  path {
                    transition: all 0.2s ease-in-out;
                  }
                }

                &:hover {
                  svg {
                    path {
                      fill: orangered;
                    }
                  }
                }
              }
            }
          }

          .add-new-btn {
            margin-top: 20px;
            width: 100%;
            padding: 20px 25px;
            border-radius: 25px;
            display: flex;
            justify-content: center;
            color: #7e88c3;
            font-weight: 600;
            font-size: 12px;
            border: none;
            background: none;
            background-color: ${({ theme }) => theme.status};
            cursor: pointer;
            transition: all 0.2s ease-in-out;

            &:hover {
              background-color: ${({ theme }) => theme.checkbox};
            }

            &:focus {
              border: 1px solid #7c5dfa;
              outline: none;
            }

            img {
              margin-right: 5px;
            }
          }
        }
      }

      legend {
        font-size: 12px;
        font-weight: 600;
        color: #7c5dfa;
        grid-area: legend;
      }

      .input-wrapper {
        margin-top: 20px;
        display: flex;
        flex-direction: column;

        &.street-address {
          grid-area: street;
        }

        &.city {
          grid-area: city;
        }

        &.post-code {
          grid-area: postCode;
          margin-left: 15px;
        }

        &.country {
          grid-area: country;
          margin-left: 15px;
        }

        label {
          &.error {
            color: orangered;
          }

          font-size: 12px;
          color: ${({ theme }) => theme.edit};
        }

        input[type='text'],
        input[type='email'],
        input[type='date'] {
          &::placeholder {
            font-size: 12px;
            font-weight: 700;
            color: ${({ theme }) => theme.placeholder};
            transition: color 0.2s ease-in-out;
          }

          &:focus {
            border: 1px solid #7c5dfa;
          }

          &.error {
            border: 1px solid orangered;
          }

          background-color: ${({ theme }) => theme.invoice};
          margin-top: 10px;
          padding: 15px;
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          width: calc(100%);
          transition: all 0.2s ease-in-out;
          outline: none;
          color: ${({ theme }) => theme.font};
          font-weight: 600;
        }
      }
    }
  }

  footer {
    margin-top: 40px;
    display: ${({ params }) => (params ? 'flex' : 'grid')};
    justify-content: ${({ params }) => (params ? 'flex-end' : '')};
    grid-template-areas: 'discard . . . . . draft submit';

    button {
      padding: 17px 15px;
      border-radius: 25px;
      border: none;
      background: none;
      cursor: pointer;
      font-weight: 700;
      font-size: 12px;
      transition: background-color 0.3s ease-in-out;

      &.discard-btn {
        display: ${({ params }) => (params ? 'none' : 'block')};
        grid-area: discard;
        color: #7e88c3;
        background-color: ${({ theme }) => theme.status};
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: #dfe3fa;
        }
      }

      &.draft-btn {
        display: ${({ params }) => (params ? 'none' : 'block')};
        grid-area: draft;
        margin-right: 10px;
        background-color: #363b53;
        color: #7e88c3;

        &:hover {
          background-color: #000000;
        }

        span {
          &.mobile {
            display: none;
          }
        }
      }

      &.submit-btn {
        display: ${({ params }) => (params ? 'none' : 'block')};
        grid-area: submit;
        background-color: #7c5dfa;
        color: #ffffff;

        &:hover {
          background-color: #9277ff;
        }

        span {
          &.mobile {
            display: none;
          }
        }
      }

      &.cancel-btn {
        display: ${({ params }) => (params ? 'block' : 'none')};
        margin-right: 15px;
        padding: 15px 25px;
        color: #7c5dfa;
        background-color: ${({ theme }) => theme.status};
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: #dfe3fa;
        }
      }

      &.save-changes-btn {
        display: ${({ params }) => (params ? 'block' : 'none')};
        padding: 15px 25px;
        background-color: #7c5dfa;
        color: #ffffff;

        &:hover {
          background-color: #9277ff;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    margin-top: 90px;
    margin-left: 0;
    height: calc(100% - 90px);
    padding: 30px 40px 30px 60px;

    main {
      height: 60%;
    }
  }

  @media (max-width: 768px) {
    width: 104%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    main {
      fieldset {
        &.bill-from,
        &.bill-to {
          display: flex;
          flex-direction: column;

          .input-wrapper {
            &.post-code,
            &.country,
            &.client-post-code,
            &.client-country {
              margin-left: 0;
            }
          }
        }

        &.bill-to {
          .dates {
            flex-direction: column;

            .payment-terms {
              margin-left: 0;
            }
          }

          .item-list-wrapper {
            ul {
              li {
                flex-direction: column;

                &:not(:first-child) {
                  .input-wrapper {
                    margin-top: 20px;

                    label {
                      display: block;
                    }
                  }
                }

                .input-wrapper {
                  &.quantity,
                  &.price,
                  &.total {
                    margin-left: 0;
                  }

                  &.total {
                    padding: 10px 0;
                    flex-direction: row;
                    justify-content: space-between;

                    span {
                      margin-top: 0;
                    }
                  }
                }

                button {
                  border-radius: 8px;
                  margin-top: 20px;
                  margin-left: 0;
                  margin-bottom: 40px;
                  padding: 10px;
                  background-color: ${({ theme }) => theme.deleteBtnBg};
                }
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 425px) {
    padding: 30px 20px 30px 40px;

    header {
      h1 {
        font-size: 20px;
      }
    }

    main {
      padding-right: 20px;

      fieldset {
        &.bill-to {
          .item-list-wrapper {
            h4 {
              font-size: 16px;
            }

            .add-new-btn {
              padding: 15px 20px;
            }
          }
        }
      }
    }

    footer {
      button {
        padding: 15px;
        font-size: 12px;

        &.draft-btn,
        &.submit-btn {
          span {
            &.desktop {
              display: none;
            }

            &.mobile {
              display: block;
            }
          }
        }
      }
    }
  }

  @media (max-width: 320px) {
    margin-top: 80px;
    height: calc(100% - 80px);
  }

  @media (min-height: 600px) {
    main {
      margin-top: 20px;
      height: 73%;
    }

    footer {
      margin-top: 20px;
    }
  }

  @media (min-height: 700px) {
    main {
      height: 75%;
    }
  }

  @media (min-height: 800px) {
    main {
      height: 80%;
    }
  }

  @media (min-height: 1000px) {
    main {
      height: 82%;
    }
  }

  @media (min-height: 1300px) {
    form {
      height: auto;
    }

    main {
      height: 90%;
    }
  }
`;

export default StyledForm;
