import React, { useState } from "react";

const Dropdown = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          readOnly
          value={value || placeholder}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div onClick={() => setIsOpen(!isOpen)}>▼</div>
      </div>
      {isOpen && (
        <ul>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;