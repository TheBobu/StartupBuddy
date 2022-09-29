import React from "react";
import { TextField } from "@mui/material";

const Input = (props) => {
  const { name, label, value, error = null, required, helperText=null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      {...other}
      {...(error && { error: true, helperText: helperText })}
    />
  );
};

export default Input;
