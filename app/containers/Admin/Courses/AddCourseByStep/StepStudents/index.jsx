import React, { memo, useEffect, useState } from 'react';
import Table from "components/Common/Table";
import {Typography,Tabs,Tab,} from '@material-ui/core';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Loading from 'components/Loading';

import reducer from './reducer';
import saga from './saga';
import { viewCourseRequest ,
         viewCourseChangePage ,
         viewCourseChangeRow ,
         viewCourseSearchText ,
         getSelected,
         onChange} from './action';
import { makeSelectData } from './selectors';
import { Wrapper } from './styled';



 function AddStudentToCourse(props) {
  useInjectReducer({ key: 'addStudentToCourse', reducer });
  useInjectSaga({ key: 'addStudentToCourse', saga });

  useEffect(() => {
    props.onGetData();
  },[props.dataTable.page,props.dataTable.rowsPerPage,props.dataTable.grade,props.dataTable.searchText])

  useEffect(() => {
    props.getSelected(props.selected);
  },[props.selected])

  useEffect(() => {
    props.changeState();
  },[])

  return (
    <Wrapper>
      <Loading isLoading={props.dataTable.loading}/>
      <Tabs
        value={props.dataTable.gradeTab}
        onChange={(event, newValue) => {
          props.onChange(newValue);
        }}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        centered
      >
        <Tab label="Khối 10" />
        <Tab label="Khối 11" />
        <Tab label="Khối 12" />
      </Tabs>
      <Table
        deleteButton={false}
        rows={props.dataTable.rows}
        headCells={props.dataTable.headCells}
        passPage={props.dataTable.page}
        passRowsPerPage={props.dataTable.rowsPerPage}
        itemsSelected={props.dataTable.selected}
        totalItems={props.dataTable.totalItems}
        itemsData={props.onChooseItemsData}
        onChangePage={props.onChangePage}
        onChangeRowsPerPage={props.onChangeRowsPerPage}
        onChangeSearchText={
            (event) => {
              const { value } = event.target;
              props.onChangeSearchText(value);
          }}
        showSelectNumber={false}
      />
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  dataTable: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onGetData: params => dispatch(viewCourseRequest(params)),
    onChangePage: (params) => dispatch(viewCourseChangePage(params)),
    onChangeRowsPerPage: (params) => dispatch(viewCourseChangeRow(params)),
    // onChooseItemsData: (params) => dispatch(viewCourseChooseItem(params)),
    onChangeSearchText: (params) => dispatch(viewCourseSearchText(params)),
    getSelected:(params) => dispatch(getSelected(params)),
    onChange: (params) => dispatch(onChange(params)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(AddStudentToCourse);
