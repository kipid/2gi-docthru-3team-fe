import React from "react";
import Label from "./Label";

function InputItem({
    id,
    label,
    error,
    register = {},
    ...inputProps
  }) {
    return (
      <div>
        {label && <Label htmlFor={id}>{label}</Label>}
        <input
          id={id}
          {...inputProps}
          {...register}
        />
      </div>
    );
  }
  
  export default InputItem;
  