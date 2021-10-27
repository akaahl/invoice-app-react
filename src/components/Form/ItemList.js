import React from "react";
import { FieldArray } from "formik";
import { ReactComponent as DeleteIcon } from "../../assets/images/icon-delete.svg";
import plusIcon from "../../assets/images/icon-plus.svg";
import InputWrapper from "./InputWrapper";

const ItemList = ({ errors, touched, setItemListError }) => {
  return (
    <FieldArray name="itemList">
      {(fieldArrayProps) => {
        const { push, remove, form } = fieldArrayProps;
        const { values } = form;
        const { itemList } = values;

        return (
          <>
            <ul>
              {itemList &&
                itemList.map((item, index) => {
                  const totalPrice =
                    +itemList[index].price * +itemList[index].quantity;

                  return (
                    <li key={index}>
                      <InputWrapper
                        isFieldArray={true}
                        classname="item-name"
                        textContent="Item name"
                        name="itemName"
                        errors={errors}
                        touched={touched}
                        index={index}
                      />

                      <InputWrapper
                        isFieldArray={true}
                        classname="quantity"
                        textContent="Qty."
                        name="quantity"
                        errors={errors}
                        touched={touched}
                        index={index}
                      />

                      <InputWrapper
                        isFieldArray={true}
                        classname="price"
                        textContent="Price"
                        name="price"
                        errors={errors}
                        touched={touched}
                        index={index}
                      />

                      <div className="input-wrapper total">
                        <label htmlFor="total">Total</label>
                        <span>
                          {isNaN(totalPrice) ? 0 : totalPrice.toFixed(2)}
                        </span>
                      </div>

                      <button type="button">
                        <DeleteIcon onClick={() => remove(index)} />
                      </button>
                    </li>
                  );
                })}
            </ul>
            <button
              type="button"
              className="add-new-btn"
              onClick={() => {
                push({
                  itemName: "",
                  quantity: "",
                  price: "",
                  total: 0,
                });
                setItemListError(false);
              }}
            >
              <img src={plusIcon} alt="plus icon" />
              Add New Item
            </button>
          </>
        );
      }}
    </FieldArray>
  );
};

export default ItemList;
