import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { ListSubheader } from "@material-ui/core";
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 200,
  },
}));

function ControlledOpenSelect(props) {
  const [open, setOpen] = React.useState(false);
  const { value, label, className, valueItem, onChange ,error , helperText} = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <FormControl className={className} error={error}>
        <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {valueItem.map((each, key) => {
            return (
              <MenuItem value={each.value} key={key}>
                {each.lable}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{error ? helperText : ' '}</FormHelperText>
      </FormControl>
    </>
  );
}
export default memo(ControlledOpenSelect);
