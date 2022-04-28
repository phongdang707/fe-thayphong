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
import StepStudents from "./StepStudents";
import StepConfirm from "./StepConfirm";
import {
  Breadcrumbs,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import reducer from "./reducer";
import saga from "./saga";
import {
  addCourseRequest,
  onChange,
  getCurrentAction,
  changeActiveStep,
  viewCourseChooseItem,
  checkDataBeforeNextStep,
  changeStateCheckData,
  reset
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
function AddCourseByStep(props) {
  const classes = useStyles();
  useInjectReducer({ key: "addCourse", reducer });
  useInjectSaga({ key: "addCourse", saga });

  const { addToast } = useToasts();
  //
  useEffect(() => {
    props.onGetCurrentAction();
  }, []);

  useEffect(() => {
    if (props.dataInfo.isSucess === true) {
      addToast(props.dataInfo.messageToast.mess, {
        appearance: props.dataInfo.messageToast.type,
        autoDismiss: true,
      });
    }
    return () => {
      props.onReset();
    };
  }, [props.dataInfo.isSucess]);

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
          Khóa học
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
              label: "Thông tin khóa học",
              screen: (
                <StepInfo
                  name_course={props.dataInfo.name_course}
                  grade={props.dataInfo.grade}
                  description={props.dataInfo.description}
                  imgPreview={props.dataInfo.imgPreview}
                  onChange={props.onChange}
                />
              ),
              onCheckBeforeNext: props.checkDataBeforeNextStep,
            },
            {
              label: "Thêm học viên",
              screen: (
                <StepStudents
                  onChooseItemsData={props.onChooseItemsData}
                  selected={props.dataInfo.selected}
                  changeState={props.changeStateCheckData}
                />
              ),
            },
            {
              label: "Xác nhận",
              screen: (
                <StepConfirm
                  name={props.dataInfo.name_course}
                  grade={props.dataInfo.grade}
                  description={props.dataInfo.description}
                  student={props.dataInfo.selected.length}
                  imgPreview={props.dataInfo.imgPreview}
                />
              ),
            },
          ]}
          checkDataInfo={props.dataInfo.checkDataInfo}
          activeStep={props.dataInfo.activeStep}
          changeActiveStep={props.onChangeActiveStep}
          buttonDisable={props.dataInfo.name_course.value.trim() == "" || props.dataInfo.grade.value == ""}
          onSubmit={props.onSubmit}
          buttonName={props.dataInfo.buttonName}
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
    onSubmit: (params) => dispatch(addCourseRequest(params)),
    onChange: (params) => dispatch(onChange(params)),
    onGetCurrentAction: (params) => dispatch(getCurrentAction(params)),
    onChangeActiveStep: (params) => dispatch(changeActiveStep(params)),
    onChooseItemsData: (params) => dispatch(viewCourseChooseItem(params)),
    checkDataBeforeNextStep: (params) =>
      dispatch(checkDataBeforeNextStep(params)),
    changeStateCheckData: (params) => dispatch(changeStateCheckData(params)),
    onReset: (params) => dispatch(reset(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(AddCourseByStep);
