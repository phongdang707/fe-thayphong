import React, { memo, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeStyles } from "@material-ui/core/styles";
import parse from "html-react-parser";
import Loading from "components/Loading";
import { NavigateBefore, NavigateNext, DoneOutline } from "@material-ui/icons";
import CountdownTimer from "components/Common/CountdownTimer";
import Button from "components/Common/Button";
import reducer from "./reducer";
import saga from "./saga";
import { onReset, init, onChange, onSubmit } from "./action";
import { makeSelectData } from "./selectors";
import { Wrapper } from "./styled";

const useStyles = makeStyles({
  paper: {
    marginTop: "24px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperQuestion: {
    marginTop: "24px",
    padding: "20px",
  },
  divQuestion: {
    borderWidth: "1px",
    borderRadius: "10px",
    borderStyle: "solid",
    borderColor: "#ebebeb",
    padding: "1em",
    marginBottom: "1em",
  },
  divAnswer: {
    display: "flex",
    alignItems: "center",
    borderWidth: "1px",
    borderRadius: "5px",
    borderColor: "#ebebeb",
    borderStyle: "solid",
    marginBottom: "0.5em",
  },
  rowQuestion: {
    display: "flex",
    width: "100%",
    margin: "0.5rem",
  },
  itemQuestionDisplay: {
    fontSize: "0px",
    textAlign: "center",
    width: "10%",
    margin: "1px ",
    backgroundColor: "#ebebeb",
    borderRadius: "5px",
  },
  itemQuestion: {
    fontSize: "0px",
    textAlign: "center",
    width: "10%",
    margin: "1px ",
    borderWidth: "1px",
    borderColor: "#ebebeb",
    borderRadius: "5px",
    borderStyle: "solid",
  },
  divButtonPage: {
    display: "flex",
    justifyContent: "center",
  },
});

function DoExam(props) {
  const classes = useStyles();

  useInjectReducer({ key: "studentDoTest", reducer });
  useInjectSaga({ key: "studentDoTest", saga });

  useEffect(() => {
    props.init();
    return () => {
      props.onReset();
    };
  }, []);

  return (
    <Wrapper>
      <Loading isLoading={props.dataDoTest.loading}></Loading>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1} className={classes.paperQuestion}>
            {(() => {
              const questionDisplay = [];
              const page = props.dataDoTest.page;
              for (let i = page * 5; i < page * 5 + 5; i++) {
                const question = props.dataDoTest.quiz[i];
                const key = i;
                if (question) {
                  questionDisplay.push(
                    <div className={classes.divQuestion} key={i}>
                      <Typography>Câu {i + 1}</Typography>
                      {question.question ? parse(question.question) : null}
                      <div className={classes.divAnswer}>
                        <Checkbox
                          color="primary"
                          checked={
                            props.dataDoTest.answer[key].answer ==
                            question.answer_a.id
                          }
                          onChange={() =>
                            props.onChange({
                              student_answer: {
                                key,
                                answer: question.answer_a.id,
                              },
                            })
                          }
                        />
                        <Typography>Câu A: {question.answer_a.text}</Typography>
                      </div>
                      <div className={classes.divAnswer}>
                        <Checkbox
                          color="primary"
                          checked={
                            props.dataDoTest.answer[key].answer ==
                            question.answer_b.id
                          }
                          onChange={() =>
                            props.onChange({
                              student_answer: {
                                key,
                                answer: question.answer_b.id,
                              },
                            })
                          }
                        />
                        <Typography>Câu B: {question.answer_b.text}</Typography>
                      </div>
                      <div className={classes.divAnswer}>
                        <Checkbox
                          color="primary"
                          checked={
                            props.dataDoTest.answer[key].answer ==
                            question.answer_c.id
                          }
                          onChange={() =>
                            props.onChange({
                              student_answer: {
                                key,
                                answer: question.answer_c.id,
                              },
                            })
                          }
                        />
                        <Typography>Câu C: {question.answer_c.text}</Typography>
                      </div>
                      <div className={classes.divAnswer}>
                        <Checkbox
                          color="primary"
                          checked={
                            props.dataDoTest.answer[key].answer ==
                            question.answer_d.id
                          }
                          onChange={() =>
                            props.onChange({
                              student_answer: {
                                key,
                                answer: question.answer_d.id,
                              },
                            })
                          }
                        />
                        <Typography>Câu D: {question.answer_d.text}</Typography>
                      </div>
                    </div>
                  );
                }
              }
              return questionDisplay;
            })()}
            <div className={classes.divButtonPage}>
              {props.dataDoTest.page != 0 ? (
                <IconButton onClick={() => props.onChange({ back: true })}>
                  <Tooltip title="Trang trước">
                    <NavigateBefore />
                  </Tooltip>
                </IconButton>
              ) : null}
              {props.dataDoTest.page * 5 + 5 < props.dataDoTest.quiz.length ? (
                <IconButton onClick={() => props.onChange({ next: true })}>
                  <Tooltip title="Trang sau">
                    <NavigateNext />
                  </Tooltip>
                </IconButton>
              ) : null}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} className={classes.paper}>
            <CountdownTimer
              time_start={props.dataDoTest.time_start}
              time={props.dataDoTest.time}
              onFinish={props.onSubmit}
            />
            {(() => {
              const list = [];
              for (
                let i = 0;
                i < Math.ceil(props.dataDoTest.quiz.length / 10);
                i++
              ) {
                const keyrow = i;
                list.push(
                  <div className={classes.rowQuestion} key={i}>
                    {(() => {
                      const row = [];
                      for (let j = 0; j < 10; j++) {
                        const ans = props.dataDoTest.answer[i * 10 + j];
                        const key = j;
                        const display =
                          props.dataDoTest.page * 5 <= i * 10 + j &&
                          i * 10 + j < props.dataDoTest.page * 5 + 5;
                        ans
                          ? row.push(
                              <div
                                className={
                                  display
                                    ? classes.itemQuestionDisplay
                                    : classes.itemQuestion
                                }
                                key={j}
                              >
                                <IconButton
                                  onClick={() =>
                                    props.onChange({
                                      itemQuestion: keyrow * 10 + key,
                                    })
                                  }
                                  size="small"
                                  color={ans.answer ? "primary" : "default"}
                                >
                                  {i * 10 + j + 1}
                                </IconButton>
                              </div>
                            )
                          : null;
                      }
                      return row;
                    })()}
                  </div>
                );
              }
              return list;
            })()}
            <Button
              content="Nộp bài"
              startIcon={<DoneOutline />}
              onClick={props.onSubmit}
            />
          </Paper>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  dataDoTest: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onReset: (params) => dispatch(onReset(params)),
    init: (params) => dispatch(init(params)),
    onChange: (params) => dispatch(onChange(params)),
    onSubmit: (params) => dispatch(onSubmit(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(DoExam);
