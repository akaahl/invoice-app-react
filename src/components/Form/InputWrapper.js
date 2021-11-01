import React, { useEffect } from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerInput from "./DatePickerInput";

const InputWrapper = ({
  classname,
  textContent,
  name,
  errors,
  touched,
  isFieldArray,
  index,
  value,
  selectedDate,
  setFieldValue,
  selectedItems,
}) => {
  const formatDate = (date) => {
    const dateArr = date.split("-");
    const formattedDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    return formattedDate;
  };

  useEffect(() => {
    if (setFieldValue && selectedItems) {
      setFieldValue(`itemList[${index}].${name}`, selectedItems[index][name]);
    }

    if (value && setFieldValue) {
      setFieldValue(name, value);
    }

    if (selectedDate && setFieldValue) {
      setFieldValue(name, formatDate(selectedDate));
    }
  }, [
    setFieldValue,
    selectedDate,
    name,
    value,
    selectedItems,
    isFieldArray,
    index,
  ]);

  return (
    <div className={`input-wrapper ${classname}`}>
      {name === "invoiceDate" || isFieldArray ? (
        <label htmlFor={classname}>{textContent}</label>
      ) : (
        <label
          htmlFor={name}
          className={errors[name] && touched[name] ? "error" : ""}
        >
          {textContent}
        </label>
      )}

      {name === "invoiceDate" ? (
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;

            return (
              <DatePicker
                id="invoiceDate"
                selected={value}
                onChange={(date) => setFieldValue("invoiceDate", date)}
                dateFormat="yyyy/MM/dd"
                customInput={<DatePickerInput />}
              />
            );
          }}
        </Field>
      ) : isFieldArray ? (
        <Field
          type="text"
          name={`itemList[${index}].${name}`}
          id={name}
          className={
            errors.itemList &&
            errors.itemList[index] &&
            errors.itemList[index][name] &&
            touched.itemList &&
            touched.itemList[index] &&
            touched.itemList[index][name]
              ? "error"
              : ""
          }
        />
      ) : (
        <Field
          type="text"
          id={name}
          name={name}
          className={errors[name] && touched[name] ? "error" : ""}
          placeholder={
            name === "description" ? "e.g. Graphic Design Service" : ""
          }
        />
      )}
    </div>
  );
};

export default InputWrapper;
