import React, { useEffect,useState, memo } from "react";
import Table from "components/Common/Table";
import ConfirmDialog from "components/Common/ConfirmDialog";
import {
  Breadcrumbs,
  Divider,
  Tabs,
  Tab,
  Link,
  Typography,
  Paper
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useToasts } from "react-toast-notifications";
import Loading from "components/Loading";
import reducer from "./reducer";
import saga from "./saga";
import {
  viewExamRequest,
  viewExamChangePage,
  viewExamChangeRow,
  viewExamChooseItem,
  viewExamDeleteItem,
  viewExamSearchText,
  viewExamSelectEdit,
  viewExamSelectRow,
  reset,
  onCloseDialog,
  onOpenDialog,
  onChange
} from "./action";
import { makeStyles } from "@material-ui/core/styles";
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
  paper: {
    padding: "20px",
  },
});

function ViewExam(props) {
  const classes = useStyles();
  useInjectReducer({ key: "viewExam", reducer });
  useInjectSaga({ key: "viewExam", saga });
  const [flag, setFlag] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    props.onGetData();
  }, [
    props.dataTable.grade,
    props.dataTable.page,
    props.dataTable.rowsPerPage,
    props.dataTable.searchText,
    flag
  ]);

  useEffect(() => {
    if (props.dataTable.isSucess === true) {
      addToast(props.dataTable.messageToast.mess, {
        appearance: props.dataTable.messageToast.type,
        autoDismiss: true,
      });
      setFlag(!flag)
    }
    return () => {
      props.onReset();
    };
  }, [props.dataTable.isSucess]);

  return (
    <Wrapper>
      <Loading isLoading={props.dataTable.loading} />
      <Helmet defaultTitle="Thư viện đề thi">
        <meta name="description" content="REACT" />
      </Helmet>
      <Typography variant="h6" className={classes.heading}>
        Thư viện đề thi
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
          Thư viện đề thi
        </Link>
      </Breadcrumbs>
      <Divider className={classes.hr}></Divider>
      <ConfirmDialog
        isOpenDialog = {props.dataTable.openDialogConfirm}
        onCloseDialog = {props.onCloseDialog}
        onPositiveChoice = {props.onDeleteItems}
        title = "Xóa bài thi"
        content = {`Xác nhận xóa ${props.dataTable.selected.length} dòng`}
      />
      <Paper elevation={0} className={classes.paper}>
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
          rows={props.dataTable.rows}
          headCells={props.dataTable.headCells}
          passPage={props.dataTable.page}
          passRowsPerPage={props.dataTable.rowsPerPage}
          itemsData={props.onChooseItemsData}
          selectEdit={props.onSelectEdit}
          selectRow={props.onSelectRow}
          itemsSelected={props.dataTable.selected}
          deleteItems={props.onOpenDialog}
          totalItems={props.dataTable.totalItems}
          tableName={props.dataTable.tableName}
          onChangePage={props.onChangePage}
          onChangeRowsPerPage={props.onChangeRowsPerPage}
          onChangeSearchText={(event) => {
            const { value } = event.target;
            props.onChangeSearchText(value);
          }}
          orderBy='create_at'
          showEditButton={true}
        />
      </Paper>
    </Wrapper>
  );
}
const mapStateToProps = createStructuredSelector({
  dataTable: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onGetData: (params) => dispatch(viewExamRequest(params)),
    onChangePage: (params) => dispatch(viewExamChangePage(params)),
    onChangeRowsPerPage: (params) => dispatch(viewExamChangeRow(params)),
    onChooseItemsData: (params) => dispatch(viewExamChooseItem(params)),
    onDeleteItems: (params) => dispatch(viewExamDeleteItem(params)),
    onChangeSearchText: (params) => dispatch(viewExamSearchText(params)),
    onSelectEdit: (params) => dispatch(viewExamSelectEdit(params)),
    onSelectRow: (params) => dispatch(viewExamSelectRow(params)),
    onReset: (params) => dispatch(reset(params)),
    onCloseDialog: (params) => dispatch(onCloseDialog(params)),
    onOpenDialog: (params) => dispatch(onOpenDialog(params)),
    onChange: (params) => dispatch(onChange(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(ViewExam);
