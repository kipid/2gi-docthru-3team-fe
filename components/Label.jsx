import React from "react";

function Label({ htmlFor, children, className = "" }) {
  return (
    <label htmlFor={htmlFor} className={`label ${className}`}>
      {children}
    </label>
  );
}

export default Label;