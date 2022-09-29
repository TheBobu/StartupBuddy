import React from "react";
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from "@mui/material";

export default function Select(props) {
  const { name, label, value, error = null, helperText = null, required, defaultValue, onChange, options } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        defaultValue={defaultValue}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <MenuItem value="">None</MenuItem>
        {options?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

