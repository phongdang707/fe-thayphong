import React, { memo, useEffect, useState } from "react";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Wrapper } from "./styled";
import Loading from "components/Loading";
import { Helmet } from "react-helmet";
import Stepper from "components/Common/Stepper";
import StepInfo from "./StepInfo";
import StepQuiz from "./StepQuiz";
import StepConfirm from "./StepConfirm";
import {
  Breadcrumbs,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import reducer from "./reducer";
import saga from "./saga";
import {
  onChange,
  addExamRequest,
  changeActiveStep,
  checkDataBeforeNextStep,
  changeStateCheckData,
  getCurrentAction
} from "./action";
import { makeSelectData } from "./selectors";

const useStyles = makeStyles({
  heading: {
    fontWeight: "600",
  },
  hr: {
    marginTop: "24px",
  },
  breadCrumbs: {
    fontSize: "13px",
  },
  paper: {
    marginTop: "24px",
    padding: "20px",
  },
});
function AddExamByStep(props) {
  const classes = useStyles();
  useInjectReducer({ key: "addExam", reducer });
  useInjectSaga({ key: "addExam", saga });

  useEffect(() => {
    props.onGetCurrentAction();
  }, []);

  return (
    <Wrapper>
      <Loading isLoading={props.dataInfo.loading} />
      <Helmet defaultTitle={props.dataInfo.helmet}>
        <meta name="description" content="REACT" />
      </Helmet>
      <Typography variant="h6" className={classes.heading}>
        {props.dataInfo.helmet}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
        <Link
          color="inherit"
          //to='/admin/dashboard/'
        >
          Admin
        </Link>
        <Link
          color="inherit"
          //to="/admin/courses/"
        >
          Thư viện đề thi
        </Link>
        <Link color="textPrimary" aria-current="page">
          {props.dataInfo.helmet}
        </Link>
      </Breadcrumbs>
      <Divider className={classes.hr}></Divider>
      <Paper elevation={0} className={classes.paper}>
        <Stepper
          display={[
            {
              label: "Thông tin bài kiểm tra",
              screen: (
                <StepInfo
                  name_exam={props.dataInfo.name_exam}
                  grade={props.dataInfo.grade}
                  onChange={props.onChange}
                  gradeList={[
                    { lable: "10", value: "10" },
                    { lable: "11", value: "11" },
                    { lable: "12", value: "12" },
                  ]}
                />
              ),
            onCheckBeforeNext: props.checkDataBeforeNextStep,
            },
            {
              label: "Bộ câu hỏi",
              screen: (
                <StepQuiz
                  changeState={props.changeStateCheckData}
                  id={props.dataInfo.id}
                />
              ),
            },
            {
              label: "Xác nhận",
              screen: (
                <StepConfirm
                  name_exam={props.dataInfo.name_exam}
                  grade={props.dataInfo.grade}
                />
              ),
            },
          ]}
          checkDataInfo={props.dataInfo.checkDataInfo}
          activeStep={props.dataInfo.activeStep}
          changeActiveStep={props.onChangeActiveStep}
          buttonDisable={props.dataInfo.name_exam.value == "" ||props.dataInfo.grade == ""}
          onSubmit={props.onSubmit}
          buttonName="Hoàn thành"
        />
      </Paper>
    </Wrapper>
  );
}
const mapStateToProps = createStructuredSelector({
  dataInfo: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (params) => dispatch(addExamRequest(params)),
    onChange: (params) => dispatch(onChange(params)),
    onGetCurrentAction: (params) => dispatch(getCurrentAction(params)),
    onChangeActiveStep: (params) => dispatch(changeActiveStep(params)),
    checkDataBeforeNextStep: (params) =>  dispatch(checkDataBeforeNextStep(params)),
    changeStateCheckData: (params) => dispatch(changeStateCheckData(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(AddExamByStep);
