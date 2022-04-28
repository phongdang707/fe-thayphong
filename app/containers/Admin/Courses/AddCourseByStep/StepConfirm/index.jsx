import React, { memo, useEffect, useState } from "react";
import { Wrapper } from "./styled";
import parse from "html-react-parser";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  heading: {
    fontWeight: "600",
  },
  imagePrev: {
    height: 100,
  },
  wrapDiv: {
    display: "flex",
    justifyContent: "space-around",
  },
});
export default function AddConfirm(props) {
  const classes = useStyles();

  return (
    <Wrapper>
      <Typography variant="h6" className={classes.heading}>
        Xác nhận thông tin khóa học
      </Typography>
      <Typography>
        Tên khóa học:
        <span style={{ color: "#376fd0" }}>{" " + props.name.value}</span>
      </Typography>
      <Typography>
        Khối:
        <span style={{ color: "#376fd0" }}>{" " + props.grade.value}</span>
      </Typography>
      <Typography>
        Số học sinh:
        <span style={{ color: "rgb(239, 51, 63)" }}>{" " + props.student}</span>
      </Typography>
      <Typography>Mô tả:</Typography>
      {props.description.value ? parse(props.description.value) : null}
    </Wrapper>
  );
}
//<img className={classes.imagePrev} src={props.imgPreview} />
