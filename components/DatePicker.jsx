import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <input
          type="text"
          readOnly
          value={value ? value.toLocaleDateString() : placeholder}
          onClick={() => setIsOpen(!isOpen)}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle calendar"
        >
          ▼
        </button>
      </div>
      {isOpen && (
        <DatePicker selected={value} onChange={onChange} inline />
      )}
    </div>
  );
};

export default DatePicker;