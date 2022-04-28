import React, { memo, useEffect, useState } from "react";
import Table from "components/Common/Table";
import {Typography, Paper} from '@material-ui/core';
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Loading from "components/Loading";
import { makeStyles } from "@material-ui/core/styles";
import reducer from "./reducer";
import saga from "./saga";
import {
  init,
  onReset,
  viewChangePage,
  viewChangeRow,
} from "./action";
import { makeSelectData } from "./selectors";
import { Wrapper } from "./styled";

const useStyles = makeStyles({
  heading: {
    fontWeight: "600",
    width:'100%',
    padding:'2em 0'
  },
  paperTable: {
    marginTop: "24px",
    padding: "20px",
  },
});

function Exam(props) {
  const classes = useStyles();
  useInjectReducer({ key: "studentExamResult", reducer });
  useInjectSaga({ key: "studentExamResult", saga });

  useEffect(() => {
    props.onGetData();
  }, [
    props.dataResult.page,
    props.dataResult.rowsPerPage,
  ]);

  return (
    <Wrapper>
      <Loading isLoading={props.dataResult.loading}></Loading>
      <Paper elevation={0} className={classes.paperTable}>
        <Typography variant="h6" className={classes.heading}>
          Bài kiểm tra đã thực hiện
        </Typography>
        <Table
          rows={props.dataResult.rows}
          headCells={props.dataResult.headCells}
          showCheckbox= {false}
          showHeader = {false}
          passPage={props.dataResult.page}
          passRowsPerPage={props.dataResult.rowsPerPage}
          totalItems={props.dataResult.totalItems}
          onChangePage={props.onChangePage}
          onChangeRowsPerPage={props.onChangeRowsPerPage}
        />
      </Paper>
    </Wrapper>
  );
}
const mapStateToProps = createStructuredSelector({
  dataResult: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onReset: (params) => dispatch(onReset(params)),
    onGetData: (params) => dispatch(init(params)),
    onChangePage: (params) => dispatch(viewChangePage(params)),
    onChangeRowsPerPage: (params) => dispatch(viewChangeRow(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(Exam);
