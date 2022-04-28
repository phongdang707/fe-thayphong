import React, { memo, useEffect, useState } from "react";
import Table from "components/Common/Table";
import Selector from "components/Common/UISelector";
import Button from "components/Common/Button";
import Modal from "components/Common/ModalCallback";
import ConfirmDialog from "components/Common/ConfirmDialog";
import { Helmet } from "react-helmet";
import {Typography, Paper , Grid, Checkbox,Link,Divider,Breadcrumbs } from '@material-ui/core';
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { createStructuredSelector } from "reselect";
import Loading from "components/Loading";
import { makeStyles } from "@material-ui/core/styles";
import reducer from "./reducer";
import saga from "./saga";
import {
  init,
  onChange,
  viewChangePage,
  viewChangeRow,
  viewSearchText,
  dataAction,
  reset,
  onCloseDialog,
  onOpenDialog
} from "./action";
import { makeSelectData } from "./selectors";
import { Wrapper } from "./styled";

const useStyles = makeStyles({
  heading: {
    fontWeight: "600",
  },
  hr: {
    margin: "24px 0",
  },
  breadCrumbs: {
    fontSize: "13px",
  },
  checkboxDiv:{
    display:"flex",
    alignItems:'center'
  },
  headerTable: {
    borderLeft: "5px solid #376fd0",
    margin: "20px 0",
    paddingLeft: "5px",
    fontWeight: "600",
  },
});

function AdminData(props) {
  const classes = useStyles();

  const [flag, setFlag] = useState(false);
  useInjectReducer({ key: "adminData", reducer });
  useInjectSaga({ key: "adminData", saga });
  const { addToast } = useToasts();

  useEffect(() => {
    if(props.dataManager.collectionName)
      props.onGetData();
  }, [
    props.dataManager.collectionName,
    props.dataManager.page,
    props.dataManager.rowsPerPage,
    props.dataManager.searchText,
    flag
  ]);

  useEffect(() => {
    if (props.dataManager.isSucess === true) {
      addToast(props.dataManager.messageToast.mess, {
        appearance: props.dataManager.messageToast.type,
        autoDismiss: true,
      });
      setFlag(!flag)
    }
    return () => {
      props.onReset();
    };
  }, [props.dataManager.isSucess]);

  return (
    <Wrapper>
      <Loading isLoading={props.dataManager.loading} />
      <Helmet defaultTitle="Quản lý dữ liệu">
        <meta name="description" content="REACT" />
      </Helmet>
      <Typography variant="h6" className={classes.heading}>
        Quản lý dữ liệu
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
        <Link
          color="inherit"
        >
          Admin
        </Link>
        <Link
          color="textPrimary" aria-current="page"
        >
          Quản lý dữ liệu
        </Link>
      </Breadcrumbs>
      <Divider className={classes.hr}></Divider>
      <Typography variant="h6" className={classes.headerTable}>
        Khôi phục/ Xóa hoàn toàn dữ liệu từ CSDL
      </Typography>
      <Grid spacing={3} container>
        <Grid item xs={12} md={2}>
          <div className={classes.checkboxDiv}>
            <Checkbox
              color="primary"
              checked={props.dataManager.collectionName == "courses"}
              onChange={() =>
                props.onChange({ collectionName: "courses" })
              }
            />
            <Typography >
              Khóa học
            </Typography>
          </div>
          <div className={classes.checkboxDiv}>
            <Checkbox
              color="primary"
              checked={props.dataManager.collectionName == "students"}
              onChange={() =>
                props.onChange({ collectionName: "students" })
              }
            />
            <Typography >
              Tài khoản
            </Typography>
          </div>
          <div className={classes.checkboxDiv}>
            <Checkbox
              color="primary"
              checked={props.dataManager.collectionName == "exams"}
              onChange={() =>
                props.onChange({ collectionName: "exams" })
              }
            />
            <Typography >
              Bài thi
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={10}>
          <Table
            deleteButton={false}
            rows={props.dataManager.rows}
            headCells={props.dataManager.headCells}
            showCheckbox= {false}
            passPage={props.dataManager.page}
            passRowsPerPage={props.dataManager.rowsPerPage}
            totalItems={props.dataManager.totalItems}
            onChangePage={props.onChangePage}
            onChangeRowsPerPage={props.onChangeRowsPerPage}
            tableName={props.dataManager.tableName}
            onChangeSearchText={
                (event) => {
                  const { value } = event.target;
                  props.onChangeSearchText(value);
              }}
            showSelectNumber={false}
            showDeleteButton
            showRestoreButton
            selectRestore = {props.onOpenDialog}
            selectRemove = {props.onOpenDialog}
          />
        </Grid>
      </Grid>
      <ConfirmDialog
        isOpenDialog = {props.dataManager.openDialogConfirm}
        onCloseDialog = {props.onCloseDialog}
        onPositiveChoice = {props.onDataAction}
        title = {props.dataManager.dialogMessage.title}
        content = {props.dataManager.dialogMessage.content}
      />
    </Wrapper>
  );
}
const mapStateToProps = createStructuredSelector({
 dataManager: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onReset: (params) => dispatch(reset(params)),
    onGetData: (params) => dispatch(init(params)),
    onChange: (params) => dispatch(onChange(params)),
    onChangePage: (params) => dispatch(viewChangePage(params)),
    onChangeRowsPerPage: (params) => dispatch(viewChangeRow(params)),
    onChangeSearchText: (params) => dispatch(viewSearchText(params)),
    onDataAction: (params) => dispatch(dataAction(params)),
    onCloseDialog: (params) => dispatch(onCloseDialog(params)),
    onOpenDialog: (params) => dispatch(onOpenDialog(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(AdminData);
