import React, { forwardRef } from "react";
import { formatDate } from "../../utils";
import calendarIcon from "../../assets/images/icon-calendar.svg";

const DatePickerInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="custom-date-picker"
    >
      {formatDate(value, true)}
      <img src={calendarIcon} alt="calendar icon" />
    </button>
  );
});

export default DatePickerInput;
