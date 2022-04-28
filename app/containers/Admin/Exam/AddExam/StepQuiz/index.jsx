import React, { memo, useEffect, useState } from "react";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useToasts } from "react-toast-notifications";
import { Wrapper } from "./styled";
import Loading from "components/Loading";
import Modal from "components/Common/Modal";
import ConfirmDialog from "components/Common/ConfirmDialog";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Input from "components/Common/Input";
import Selector from "components/Common/UISelector";
import Button from "@material-ui/core/Button";
import { Editor } from "@tinymce/tinymce-react";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import {
  Breadcrumbs,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { NavigateBefore,NavigateNext,} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import parse from "html-react-parser";
import reducer from "./reducer";
import saga from "./saga";
import {
  onChange,
  getQuizExam,
  modalOpen,
  modalClose,
  addQuizRequest,
  onDeleteQuiz,
  reset,
  onCloseDialog,
  onOpenDialog,
} from "./action";
import { makeSelectData } from "./selectors";
import { URL_API } from "../../../../../config/common";

const useStyles = makeStyles({
  popup: {
    width: (window.innerWidth * 80) / 100,
  },
  ansDiv: {
    display: "flex",
    alignItems: "center",
  },
  inputDiv: {
    flex: 1,
  },
  content: {
    margin: "1em 0",
    width: "100%",
  },
  text: {
    display: "flex",
  },
  textDiv: {
    marginRight: "1em",
    whiteSpace:'nowrap'
  },
  headDiv: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1em ",
  },
  divButtonItemPage: {
    display: "flex",
    alignItems:'center',
    marginTop:'2em'
  },
  divButtonPage: {
    display: "flex",
    justifyContent: "center",
    alignItems:'center',
    width:'100%'
  },
  selectDrop: {
    whiteSpace: "nowrap",
    position:'absolute'
  },
});
function AddQuiz(props) {
  const classes = useStyles();
  useInjectReducer({ key: "addQuiz", reducer });
  useInjectSaga({ key: "addQuiz", saga });
  const [flag, setFlag] = useState(false);

  const { addToast } = useToasts();


  useEffect(() => {
    if (props.dataQuiz.isSucess === true) {
      addToast(props.dataQuiz.messageToast.mess, {
        appearance: props.dataQuiz.messageToast.type,
        autoDismiss: true,
      });
      setFlag(!flag)
    }
    props.onChange({ id: props.id });
    props.changeState();
    return () => {
      props.onReset();
    };
  }, [props.dataQuiz.isSucess]);

  useEffect(() => {
    props.onGetQuizExam();
  }, [
    props.dataQuiz.page,
    props.dataQuiz.rowsPerPage,
    flag
  ]);

  return (
    <Wrapper>
      <ConfirmDialog
        isOpenDialog={props.dataQuiz.openDialogConfirm}
        onCloseDialog={props.onCloseDialog}
        onPositiveChoice={props.onDeleteQuiz}
        title="Xóa câu hỏi"
        content={`Xác nhận xóa câu hỏi?`}
      />
      <div className={classes.headDiv}>
        <Typography>Danh sách câu hỏi</Typography>
        <Modal
          buttonName="Thêm Câu hỏi"
          buttonPositive="Xác nhận"
          onPositiveClick={props.onSubmit}
          buttonNegative="Hủy"
          buttonPositiveDisable={
            props.dataQuiz.question.value == "" ||
            props.dataQuiz.answer_a.value == "" ||
            props.dataQuiz.answer_b.value == "" ||
            props.dataQuiz.answer_c.value == "" ||
            props.dataQuiz.answer_d.value == "" ||
            props.dataQuiz.correct_answer == ""
          }
          modalOpenState={props.dataQuiz.handleAdd}
          modalClose={() => props.modalClose()}
          modalOpen={() => props.modalOpen()}
          header="Câu hỏi"
          body={
            <div className={classes.popup}>
              <Loading isLoading={props.dataQuiz.loadingModal} />
              <Editor
                apiKey="mj0yktmn49wns1bzkfibtier34b0oa0u8ajnd43vdnffb41g"
                init={{
                  height: 250,
                  selector: "textarea#myTextAreaStepQuiz",
                  plugins: [
                    "lists link image paste help wordcount tinydrive media",
                  ],
                  toolbar:
                    "insertfile image undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",

                  tinydrive_token_provider: `${URL_API}/users/tinymce`,
                }}
                value={props.dataQuiz.question.value}
                onEditorChange={(event) => {
                  props.onChange({ question: event });
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} className={classes.ansDiv}>
                  <Checkbox
                    color="primary"
                    checked={props.dataQuiz.correct_answer == "answer_a"}
                    onChange={() =>
                      props.onChange({ correct_answer: "answer_a" })
                    }
                  />
                  <div className={classes.inputDiv}>
                    <Input
                      label="Câu A"
                      fullWidth
                      value={props.dataQuiz.answer_a.value}
                      onChange={(event) => {
                        const { value } = event.target;
                        props.onChange({ answer_a: value });
                      }}
                      helperText={props.dataQuiz.answer_a.listErros}
                      error={props.dataQuiz.answer_a.error}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6} className={classes.ansDiv}>
                  <Checkbox
                    color="primary"
                    checked={props.dataQuiz.correct_answer == "answer_b"}
                    onChange={() =>
                      props.onChange({ correct_answer: "answer_b" })
                    }
                  />
                  <div className={classes.inputDiv}>
                    <Input
                      fullWidth
                      label="Câu B"
                      value={props.dataQuiz.answer_b.value}
                      onChange={(event) => {
                        const { value } = event.target;
                        props.onChange({ answer_b: value });
                      }}
                      helperText={props.dataQuiz.answer_b.listErros}
                      error={props.dataQuiz.answer_b.error}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6} className={classes.ansDiv}>
                  <Checkbox
                    color="primary"
                    checked={props.dataQuiz.correct_answer == "answer_c"}
                    onChange={() =>
                      props.onChange({ correct_answer: "answer_c" })
                    }
                  />
                  <div className={classes.inputDiv}>
                    <Input
                      fullWidth
                      label="Câu C"
                      value={props.dataQuiz.answer_c.value}
                      onChange={(event) => {
                        const { value } = event.target;
                        props.onChange({ answer_c: value });
                      }}
                      helperText={props.dataQuiz.answer_c.listErros}
                      error={props.dataQuiz.answer_c.error}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6} className={classes.ansDiv}>
                  <Checkbox
                    color="primary"
                    checked={props.dataQuiz.correct_answer == "answer_d"}
                    onChange={() =>
                      props.onChange({ correct_answer: "answer_d" })
                    }
                  />
                  <div className={classes.inputDiv}>
                    <Input
                      fullWidth
                      label="Câu D"
                      value={props.dataQuiz.answer_d.value}
                      onChange={(event) => {
                        const { value } = event.target;
                        props.onChange({ answer_d: value });
                      }}
                      helperText={props.dataQuiz.answer_d.listErros}
                      error={props.dataQuiz.answer_d.error}
                    />
                  </div>
                </Grid>
              </Grid>
              <Typography>
                Lời giải
              </Typography>
              <Editor
                apiKey="mj0yktmn49wns1bzkfibtier34b0oa0u8ajnd43vdnffb41g"
                init={{
                  height: 200,
                  selector: "textarea#myTextAreaStepQuiz",
                  plugins: [
                    "lists link image paste help wordcount tinydrive media",
                  ],
                  toolbar:
                    "insertfile image undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",

                  tinydrive_token_provider: `${URL_API}/users/tinymce`,
                }}
                value={props.dataQuiz.solution}
                onEditorChange={(event) => {
                  props.onChange({ solution: event });
                }}
              />
            </div>
          }
        />
      </div>
      {props.dataQuiz.quiz_list.map((item, index) => (
        <Card className={classes.content} key={index}>
          <CardActionArea>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography variant="h5" gutterBottom>
                    Câu {props.dataQuiz.page * props.dataQuiz.rowsPerPage + index + 1}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  {item.question ? parse(item.question) : null}
                  <div className={classes.text}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="primary"
                      className={classes.textDiv}
                    >
                      Câu A:
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color={
                        item.correct_answer.text == "answer_a"
                          ? "primary"
                          : "initial"
                      }
                    >
                      {item.answer_a.text}
                    </Typography>
                  </div>
                  <div className={classes.text}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="primary"
                      className={classes.textDiv}
                    >
                      Câu B:
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color={
                        item.correct_answer.text == "answer_b"
                          ? "primary"
                          : "initial"
                      }
                    >
                      {item.answer_b.text}
                    </Typography>
                  </div>
                  <div className={classes.text}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="primary"
                      className={classes.textDiv}
                    >
                      Câu C:
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color={
                        item.correct_answer.text == "answer_c"
                          ? "primary"
                          : "initial"
                      }
                    >
                      {item.answer_c.text}
                    </Typography>
                  </div>
                  <div className={classes.text}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="primary"
                      className={classes.textDiv}
                    >
                      Câu D:
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color={
                        item.correct_answer.text == "answer_d"
                          ? "primary"
                          : "initial"
                      }
                    >
                      {item.answer_d.text}
                    </Typography>
                  </div>
                  <div className={classes.text}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="primary"
                      display="inline"
                      className={classes.textDiv}
                    >
                      Lời giải:
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="primary"
                    >
                      {item.solution ? parse(item.solution) : null}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
          <Divider />
          <CardActions>
            <Button
              size="small"
              color="default"
              onClick={() => props.onOpenDialog(item._id)}
            >
              Xóa
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => props.modalOpen(item)}
            >
              Chỉnh sửa
            </Button>
          </CardActions>
        </Card>
      ))}
      <div className={classes.divButtonItemPage}>
        <Selector
          className={classes.selectDrop}
          onChange={(event) => {
            props.onChange({ changeItem: event });
          }}
          valueItem={[
            {value:5,lable:"5"},
            {value:10,lable:"10"},
            {value:20,lable:"20"}
          ]}
          label="Hiển thị"
          value={props.dataQuiz.rowsPerPage}
        />
        <div className={classes.divButtonPage}>
          {props.dataQuiz.page != 0 ? (
            <IconButton onClick={() => props.onChange({ back: true })}>
              <Tooltip title="Trang trước">
                <NavigateBefore />
              </Tooltip>
            </IconButton>
          ) : (
            <IconButton disabled>
                <NavigateBefore />
            </IconButton>
          )}
          <Typography>
            Trang {props.dataQuiz.page +1}
          </Typography>
          {props.dataQuiz.page * props.dataQuiz.rowsPerPage + props.dataQuiz.rowsPerPage  <
          props.dataQuiz.totalItems ? (
            <IconButton onClick={() => props.onChange({ next: true })}>
              <Tooltip title="Trang sau">
                <NavigateNext />
              </Tooltip>
            </IconButton>
          ) : (
            <IconButton disabled>
                <NavigateNext />
            </IconButton>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
const mapStateToProps = createStructuredSelector({
  dataQuiz: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onGetQuizExam: (params) => dispatch(getQuizExam(params)),
    onChange: (params) => dispatch(onChange(params)),
    modalOpen: (params) => dispatch(modalOpen(params)),
    modalClose: (params) => dispatch(modalClose(params)),
    onSubmit: (params) => dispatch(addQuizRequest(params)),
    onDeleteQuiz: (params) => dispatch(onDeleteQuiz(params)),
    onReset: (params) => dispatch(reset(params)),
    onCloseDialog: (params) => dispatch(onCloseDialog(params)),
    onOpenDialog: (params) => dispatch(onOpenDialog(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(AddQuiz);
