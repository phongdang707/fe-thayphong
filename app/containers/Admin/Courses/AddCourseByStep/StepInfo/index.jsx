import React, { memo, useEffect, useState } from "react";
import Input from "components/Common/Input";
import Selector from "components/Common/UISelector";
import { Typography, Fab, Grid } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Image from "@material-ui/icons/Image";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { makeStyles } from "@material-ui/core/styles";
import { Editor } from "@tinymce/tinymce-react";
import { Wrapper } from "./styled";
import { URL_API } from "../../../../../config/common";
const useStyles = makeStyles({
  dInput: {
    padding: "1em 0",
  },
  selectDrop: {
    minWidth: "100%",
  },
  inputPic: {
    padding: "1em 0 ",
  },
  imageDiv: {
    padding: "1em 0",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  imagePrev: {
    height: 200,
  },
  imageHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#80808012",
    borderStyle: "dashed",
    borderWidth: "thin",
    borderColor: "#808080bd",
  },
});
export default function AddStudent(props) {
  const classes = useStyles();

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Input
                label="Tên khóa học"
                value={props.name_course.value}
                fullWidth
                onChange={(event) => {
                  const { value } = event.target;
                  props.onChange({ name_course: value });
                }}
                helperText={props.name_course.listErros}
                error={props.name_course.error}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Selector
                className={classes.selectDrop}
                onChange={(event) => {
                  props.onChange({ grade: event });
                }}

                valueItem={[
                  { lable: "10", value: "10" },
                  { lable: "11", value: "11" },
                  { lable: "12", value: "12" },
                ]}
                label="Khối"
                value={props.grade.value}
              ></Selector>
            </Grid>
          </Grid>
          <div className={classes.dInput}>
            <Typography>Mô tả</Typography>
            <Editor
              apiKey="mj0yktmn49wns1bzkfibtier34b0oa0u8ajnd43vdnffb41g"
              init={{
                height: 250,
                selector: "textarea#myTextAreaContent",
                plugins: [
                  "lists link image paste help wordcount tinydrive media",
                ],
                toolbar:
                  "insertfile image undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",

                tinydrive_token_provider: `${URL_API}/users/tinymce`,
              }}
              value={props.description.value}
              onEditorChange={(event) => {
                props.onChange({ description: event });
              }}
            />
            {/* <Editor
              init={{
                selector: "textarea#myTextArea",
                plugins: ["lists link image paste help wordcount"],
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
              }}
            ></Editor> */}
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.imageDiv}>
            <label
              htmlFor="contained-button-file"
              className="custom-file-upload"
            >
              <CloudUploadIcon></CloudUploadIcon> Chọn một ảnh...
            </label>
            <input
              accept="image/*"
              className={classes.inputPic}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => {
                props.onChange({
                  imgData: e.target.files[0],
                  imgPreview: URL.createObjectURL(e.target.files[0]),
                });
              }}
            />
            {props.imgPreview ? (
              <img className={classes.imagePrev} src={props.imgPreview} />
            ) : (
              <div
                className={classes.imageHolder}
                htmlFor="contained-button-file"
              >
                <Image />
                <Typography>Nhấn để thêm</Typography>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
