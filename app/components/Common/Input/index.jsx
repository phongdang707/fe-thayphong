import React, { Children } from "react";
import PropTypes from "prop-types";
import Wrapper from "./Wrapper";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";

import DeleteIcon from "@material-ui/icons/Delete";
import { Grid } from "@material-ui/core";

function UIInput(props) {
  const {
    defaultValue,
    value,
    onChange,
    placeholder,
    label,
    error,
    helperText,
    isOnTop,
    contentLable,
    fullWidth,
    row,
    multiline,
    variant,
    endAdornment,
    startAdornment,
    type,
    inputLabelProps,
    readOnly,
    inputProps
  } = props;

  return (
      <TextField
        type={type}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        error={error}
        helperText={error ? helperText : ' '}
        fullWidth={fullWidth}
        rows={row}
        InputLabelProps={inputLabelProps}
        multiline={multiline}
        variant={variant}
        readOnly={readOnly}
        InputProps={{
          endAdornment: endAdornment,
          startAdornment: startAdornment,
          inputProps : inputProps
        }}
      />
  );
}
UIInput.defaultProps = {
  error: false,
  value: "",
  helperText: "",
  placeholder: "",
  isOnTop: false,
  contentLable: "",
  fullWidth: false,
  multiline: false,
  row: 1,
  variant: "standard",
  endAdornment: null,
  startAdornment: null,
  inputLabelProps:{
  },
  readOnly:false,
  inputProps:{}
};
UIInput.propTypes = {};

export default UIInput;
