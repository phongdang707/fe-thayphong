import React, { memo, useEffect, useState } from "react";
import { Typography, Link, Grid } from "@material-ui/core";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import parse from "html-react-parser";
import Loading from "components/Loading";
import Divider from "@material-ui/core/Divider";

import reducer from "./reducer";
import saga from "./saga";
import { onReset, init, onClick } from "./action";
import { makeSelectData } from "./selectors";
import {
  WrapperContentExam,
  HeaderExam,
  Wrapper,
  WrapperContent,
  WrapperExam,
  WrapperBodyContent,
} from "./styled";

function StudentCourse(props) {
  useInjectReducer({ key: "studentDetailCourse", reducer });
  useInjectSaga({ key: "studentDetailCourse", saga });

  useEffect(() => {
    props.init();
    return () => {
      props.onReset();
    };
  }, []);
  const style = {
    footerExam: {
      color: "#a5a5a5",
      fontWeight: "400",
      marginRight: "15px",
      fontSize: "13px",
    },
    boderLeft: {
      borderLeft: "5px solid #376fd0",
      margin: "20px 0",
      paddingLeft: "5px",
      fontWeight: "600",
    },
  };
  return (
    <Wrapper>
      <Loading isLoading={props.dataCourseStudent.loading}></Loading>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="button" display="block" align="center">
            CHÀO MỪNG CÁC BẠN ĐẾN VỚI KHÓA HỌC
          </Typography>
          <Typography
            variant="h6"
            color="error"
            align="center"
            style={{ marginBottom: "20px" }}
          >
            {props.dataCourseStudent.name_course}
          </Typography>
          <Typography variant="button" display="block" align="center">
            MÔ TẢ KHÓA HỌC
          </Typography>
          {props.dataCourseStudent.description
            ? parse(props.dataCourseStudent.description)
            : null}
          {props.dataCourseStudent.contents.map((itemChapter, index) => (
            <div key={index}>
              <Typography variant="h6" gutterBottom style={style.boderLeft} >
                Chương {itemChapter[0].chapter}
              </Typography>
              <WrapperBodyContent>
                {itemChapter.map((each, index) => (
                  <WrapperContent key={index}>
                    <Typography
                      variant="h6"
                      color="error"
                      display="inline"
                      style={{ marginRight: "10px", textTransform: "uppercase" }}
                    >
                      Lý thuyết
                    </Typography>
                    <Typography variant="h6" display="inline">
                      {each.title}
                    </Typography>
                    <Divider></Divider>
                    <Typography
                      variant="h6"
                      color="primary"
                      display="inline"
                      style={{ marginRight: "10px" }}
                    >
                      Link tài liệu
                    </Typography>
                    <Typography variant="h6" display="inline">
                      <Link href={each.link_file}>{each.link_file}</Link>
                    </Typography>
                    {parse(each.content)}
                  </WrapperContent>
                ))}
              </WrapperBodyContent>
            </div>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <WrapperExam>
            <HeaderExam>Đề thi nổi bật</HeaderExam>
            {props.dataCourseStudent.test.length > 0 ? (
              props.dataCourseStudent.test.map((item, index) => (
                <div style={{ padding: "0 20px" }} key={index}>
                  <WrapperContentExam>
                    <div onClick={() => props.onClick(item._id)}>
                      <Typography
                        align="left"
                        display="block"
                        style={{ color: "#0c0c0c", fontWeight: "700" }}
                      >
                        {item.name_exam}
                      </Typography>
                      <Typography
                        display="inline"
                        align="left"
                        style={style.footerExam}
                      >
                        {item.quiz_number} câu
                      </Typography>
                      <Typography
                        display="inline"
                        align="right"
                        style={style.footerExam}
                      >
                        {item.time} phút
                      </Typography>
                    </div>
                  </WrapperContentExam>
                  <Divider></Divider>
                </div>
              ))
            ) : (
              <div style={{ margin: "20px", textAlign: "center" }}>
                Không có đề thi
              </div>
            )}
          </WrapperExam>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  dataCourseStudent: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onReset: (params) => dispatch(onReset(params)),
    init: (params) => dispatch(init(params)),
    onClick: (params) => dispatch(onClick(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(StudentCourse);
