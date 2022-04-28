import React from 'react';
import Input from 'components/Common/Input';
import Selector from "components/Common/UISelector";
import {
  Typography,Grid
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { Wrapper } from './styled';
const useStyles = makeStyles({
  selectDrop: {
    minWidth: "100%",
  },
});
export default function StepInfoExam(props) {
  const classes = useStyles();

  return (
    <Wrapper>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <Input
            label="Tên bài thi"
            value={props.name_exam.value}
            fullWidth
            onChange={(event) => {
              const { value } = event.target;
              props.onChange({ name_exam: value });
            }}
            helperText={props.name_exam.listErros}
            error={props.name_exam.error}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Selector
              onChange={(event) => {
                props.onChange({ grade: event });
              }}
              className={classes.selectDrop}
              valueItem={props.gradeList}
              label="Khối"
              value={props.grade}
          ></Selector>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
