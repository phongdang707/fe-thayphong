import React, { memo, useEffect, useState } from "react";
import {
  Typography,
  Link,
  Paper,
  Grid,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeStyles } from "@material-ui/core/styles";
import parse from "html-react-parser";
import Loading from "components/Loading";
import Button from "components/Common/Button";
import {
  CheckCircleOutline,
  AccessTime,
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";
import reducer from "./reducer";
import saga from "./saga";
import { onReset, init, onDoTest, onChange } from "./action";
import { makeSelectData } from "./selectors";
import { Wrapper } from "./styled";

const useStyles = makeStyles({
  heading: {
    fontWeight: "600",
    width: "100%",
  },
  paper: {
    marginTop: "24px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperDes: {
    margin: "2em",
    padding: "1em",
    backgroundColor: "#e3e3e3",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  paperWarning: {
    margin: "2em",
    padding: "1em",
    backgroundColor: "#ffebc9",
    width: "100%",
  },
  groupText: {
    display: "flex",
  },
  scoreDiv: {
    display: "flex",
    justifyContent: "space-around",
  },
  divQuestion: {
    borderWidth: "1px",
    borderRadius: "10px",
    borderStyle: "solid",
    borderColor: "#ebebeb",
    padding: "1em",
    margin: "1em 0",
  },
  divAnswer: {
    borderWidth: "1px",
    borderRadius: "5px",
    borderColor: "#ebebeb",
    borderStyle: "solid",
    marginBottom: "0.5em",
  },
  divTrueAnswer: {
    borderWidth: "1px",
    borderRadius: "5px",
    borderStyle: "solid",
    marginBottom: "0.5em",
    backgroundColor: "#8ffc58",
  },
  divFalseAnswer: {
    borderWidth: "1px",
    borderRadius: "5px",
    borderColor: "#ebebeb",
    borderStyle: "solid",
    marginBottom: "0.5em",
    backgroundColor: "#ff707c",
  },
  divCorrectAnswer: {
    borderWidth: "1px",
    borderRadius: "5px",
    borderStyle: "solid",
    marginBottom: "0.5em",
  },
  divButtonPage: {
    display: "flex",
    justifyContent: "center",
  },
  startTestButton:{
    textAlign:'center'
  }
});

function StudentTest(props) {
  const classes = useStyles();

  useInjectReducer({ key: "studentTest", reducer });
  useInjectSaga({ key: "studentTest", saga });

  useEffect(() => {
    props.init();
    return () => {
      props.onReset();
    };
  }, []);

  return (
    <Wrapper>
      <Loading isLoading={props.dataCourseTest.loading}></Loading>
      <Paper elevation={1} className={classes.paper}>
        <Typography variant="h6" className={classes.heading}>
          Đề thi {props.dataCourseTest.name_exam}
        </Typography>
        <Paper elevation={0} className={classes.paperDes}>
          <div className={classes.groupText}>
            <CheckCircleOutline />
            <Typography>{props.dataCourseTest.quiz_number} câu</Typography>
          </div>
          <div className={classes.groupText}>
            <AccessTime />
            <Typography>{props.dataCourseTest.time} phút</Typography>
          </div>
        </Paper>
        <Paper elevation={0} className={classes.paperWarning}>
          {props.dataCourseTest.correct ? (
            <div className={classes.scoreDiv}>
              <Typography variant="h6" className={classes.heading}>
                Số câu đúng: {props.dataCourseTest.correct}
              </Typography>
              <Typography variant="h6" className={classes.heading}>
                Điểm số: {props.dataCourseTest.score}
              </Typography>
            </div>
          ) : (
            <div>
              <Typography variant="h6" className={classes.heading}>
                Hướng dẫn làm bài trắc nghiệm
              </Typography>
              <Typography>
                - Chọn câu trả lời, những câu đã hoàn thành sẽ được highlight
              </Typography>
              <Typography>
                - Mỗi trang sẽ có tối đa 5 câu hỏi, nhấn nút chuyển trang để
                sang trang kế tiếp hoặc nhấn vào câu muốn xem trong danh sách
                câu hỏi bên phải màn hình
              </Typography>
              <Typography>
                - Kiểm tra chắc chắn đã làm đủ số câu bằng cách xem danh sách
                câu đã được highlight chưa, sau đó nhấn nộp bài ngay dưới danh
                sách câu hỏi
              </Typography>
              <Typography color="primary">
                *Lưu ý: Mỗi học sinh chỉ được làm bài một lần, thời gian sẽ bắt
                đầu tính từ khi nhấn bắt đầu
              </Typography>
              <Typography color="primary">
                Khi hết thời gian làm bài sẽ tự động nộp bài, hãy lưu ý thời
                gian
              </Typography>
              <Typography color="primary">
                Trường hợp ngắt kết nối trước khi nộp bài, khi quay trở lại sẽ
                được tiếp tục làm nếu còn thời gian.
              </Typography>
            </div>
          )}
        </Paper>
        {props.dataCourseTest.correct ? (
          <Button
            onClick={() => props.onChange({ show: true })}
            content="Xem lời giải"
          />
        ) : (
          <div className={classes.startTestButton}>
            <Button onClick={props.onClick} content="Bắt đầu làm bài"  disabled={!props.dataCourseTest.open} />
            {props.dataCourseTest.open?null:(
              <Typography variant="caption" display="block" gutterBottom color="secondary">
                *Giảng viên chưa mở bài thi
              </Typography>
            )}
          </div>
        )}
      </Paper>
      {props.dataCourseTest.showSolution ? (
        <div>
          {(() => {
            const questionDisplay = [];
            const page = props.dataCourseTest.page;
            for (let i = page * 5; i < page * 5 + 5; i++) {
              const question = props.dataCourseTest.quiz[i];
              const result = props.dataCourseTest.result[i];
              if (question && result) {
                questionDisplay.push(
                  <div className={classes.divQuestion} key={i}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <Typography
                          variant="h6"
                          className={classes.heading}
                          color={
                            result.answer == question.correct_answer.id
                              ? "primary"
                              : "primary"
                          }
                        >
                          Câu {i + 1}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        {question.question ? parse(question.question) : null}
                        {(() => {
                          if (result.answer == question.answer_a.id) {
                            if (result.answer == question.correct_answer.id)
                              return (
                                <Typography className={classes.divTrueAnswer}>
                                  {" "}
                                  Câu A: {question.answer_a.text}
                                </Typography>
                              );
                            else
                              return (
                                <Typography className={classes.divFalseAnswer}>
                                  {" "}
                                  Câu A: {question.answer_a.text}
                                </Typography>
                              );
                          }
                          if (
                            question.correct_answer.id == question.answer_a.id
                          )
                            return (
                              <Typography className={classes.divCorrectAnswer}>
                                {" "}
                                Câu A: {question.answer_a.text}
                              </Typography>
                            );
                          return (
                            <Typography className={classes.divAnswer}>
                              {" "}
                              Câu A: {question.answer_a.text}
                            </Typography>
                          );
                        })()}
                        {(() => {
                          if (result.answer == question.answer_b.id) {
                            if (result.answer == question.correct_answer.id)
                              return (
                                <Typography className={classes.divTrueAnswer}>
                                  {" "}
                                  Câu B: {question.answer_b.text}
                                </Typography>
                              );
                            else
                              return (
                                <Typography className={classes.divFalseAnswer}>
                                  {" "}
                                  Câu B: {question.answer_b.text}
                                </Typography>
                              );
                          }
                          if (
                            question.correct_answer.id == question.answer_b.id
                          )
                            return (
                              <Typography className={classes.divCorrectAnswer}>
                                {" "}
                                Câu B: {question.answer_b.text}
                              </Typography>
                            );
                          return (
                            <Typography className={classes.divAnswer}>
                              {" "}
                              Câu B: {question.answer_b.text}
                            </Typography>
                          );
                        })()}
                        {(() => {
                          if (result.answer == question.answer_c.id) {
                            if (result.answer == question.correct_answer.id)
                              return (
                                <Typography className={classes.divTrueAnswer}>
                                  {" "}
                                  Câu C: {question.answer_c.text}
                                </Typography>
                              );
                            else
                              return (
                                <Typography className={classes.divFalseAnswer}>
                                  {" "}
                                  Câu C: {question.answer_c.text}
                                </Typography>
                              );
                          }
                          if (
                            question.correct_answer.id == question.answer_c.id
                          )
                            return (
                              <Typography className={classes.divCorrectAnswer}>
                                {" "}
                                Câu C: {question.answer_c.text}
                              </Typography>
                            );
                          return (
                            <Typography className={classes.divAnswer}>
                              {" "}
                              Câu C: {question.answer_c.text}
                            </Typography>
                          );
                        })()}
                        {(() => {
                          if (result.answer == question.answer_d.id) {
                            if (result.answer == question.correct_answer.id)
                              return (
                                <Typography className={classes.divTrueAnswer}>
                                  {" "}
                                  Câu D: {question.answer_d.text}
                                </Typography>
                              );
                            else
                              return (
                                <Typography className={classes.divFalseAnswer}>
                                  {" "}
                                  Câu D: {question.answer_d.text}
                                </Typography>
                              );
                          }
                          if (
                            question.correct_answer.id == question.answer_d.id
                          )
                            return (
                              <Typography className={classes.divCorrectAnswer}>
                                {" "}
                                Câu D: {question.answer_d.text}
                              </Typography>
                            );
                          return (
                            <Typography className={classes.divAnswer}>
                              {" "}
                              Câu D: {question.answer_d.text}
                            </Typography>
                          );
                        })()}
                        <Typography color="primary">
                          Lời giải:
                        </Typography>
                        {question.solution ? parse(question.solution) : null}
                      </Grid>
                    </Grid>
                  </div>
                );
              }
            }
            return questionDisplay;
          })()}
          <div className={classes.divButtonPage}>
            {props.dataCourseTest.page != 0 ? (
              <IconButton onClick={() => props.onChange({ back: true })}>
                <Tooltip title="Trang trước">
                  <NavigateBefore />
                </Tooltip>
              </IconButton>
            ) : null}
            {props.dataCourseTest.page * 5 + 5 <
            props.dataCourseTest.quiz.length ? (
              <IconButton onClick={() => props.onChange({ next: true })}>
                <Tooltip title="Trang sau">
                  <NavigateNext />
                </Tooltip>
              </IconButton>
            ) : null}
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  dataCourseTest: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onReset: (params) => dispatch(onReset(params)),
    init: (params) => dispatch(init(params)),
    onClick: (params) => dispatch(onDoTest(params)),
    onChange: (params) => dispatch(onChange(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(StudentTest);
