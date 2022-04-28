

import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  radioGroup: {
    display: 'flex',
    justifyContent:'space-around',
    alignItems:'center',
  },
  radio: {
    display: 'flex',
    justifyContent:'space-around',
    paddingLeft: theme.spacing(3)
  },
}));

function UIRadioGroup(props ) {
  const classes = useStyles();
  const {
    name_group,
    value,
    changeState,
    content
  } = props;

  const handleChange = (event) => {
    changeState(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <div className={classes.radioGroup}>
        <FormLabel component="legend">{name_group}</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value}
          onChange={handleChange}>
          <div className={classes.radio}>
            {content.map((item,index)=>{
              return <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.label} />
            })}
          </div>
        </RadioGroup>
      </div>
    </FormControl>
  );
}
UIRadioGroup.defaultProps = {
  changeState: ()=>{},
  name_group: '',
  value: null,
  content:[]
};
UIRadioGroup.propTypes = {};

export default UIRadioGroup;
