import React, { memo, useEffect, useState } from 'react';
import { Wrapper } from './styled';
import {
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  heading: {
    fontWeight: '600',
  },
});
export default function AddConfirm(props) {
  const classes = useStyles();


  return (
    <Wrapper>
        <Typography variant="h6" className={classes.heading}>
          Xác nhận thông tin bài thi
        </Typography>
        <Typography>
          Tên bài thi: {props.name_exam.value}
        </Typography>
        <Typography>
          Khối: {props.grade}
        </Typography>
    </Wrapper>

  );
}
