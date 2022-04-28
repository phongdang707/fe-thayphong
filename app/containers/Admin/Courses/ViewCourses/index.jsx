import React, { useEffect,useState, memo } from "react";
import Table from "components/Common/Table";
import ConfirmDialog from "components/Common/ConfirmDialog";
import {
  Breadcrumbs,
  Divider,
  Link,
  Typography,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useToasts } from "react-toast-notifications";
import Loading from "components/Loading";
import { makeStyles } from "@material-ui/core/styles";
import reducer from "./reducer";
import saga from "./saga";
import {
  viewCourseRequest,
  viewCourseChangePage,
  viewCourseChangeRow,
  viewCourseChooseItem,
  viewCourseDeleteItem,
  viewCourseSearchText,
  viewCourseSelectEdit,
  viewCourseSelectDetail,
  viewCourseSelectRow,
  reset,
  onCloseDialog,
  onOpenDialog,
  onChange
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
  paper: {
    padding: "20px",
  },
});

function ViewCourse(props) {
  const classes = useStyles();
  useInjectReducer({ key: "viewCourse", reducer });
  useInjectSaga({ key: "viewCourse", saga });
  const { addToast } = useToasts();
  const [flag, setFlag] = useState(false);

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

  useEffect(() => {
    props.onGetData();
  }, [
    props.dataTable.grade,
    props.dataTable.page,
    props.dataTable.rowsPerPage,
    props.dataTable.searchText,
    flag
  ]);

  return (
    <Wrapper>
      <Loading isLoading={props.dataTable.loading} />
      <ConfirmDialog
        isOpenDialog={props.dataTable.openDialogConfirm}
        onCloseDialog={props.onCloseDialog}
        onPositiveChoice={props.onDeleteItems}
        title="Xóa khóa học"
        content={`Xác nhận xóa ${props.dataTable.selected.length} dòng`}
      />
      <Helmet defaultTitle="Khóa học">
        <meta name="description" content="REACT" />
      </Helmet>
      <Typography variant="h6" className={classes.heading}>
        Quản lý khóa học
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
          Khóa học
        </Link>
      </Breadcrumbs>
      <Divider className={classes.hr}></Divider>
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
          selectDetail={props.onSelectDetail}
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
          orderBy="create_at"
          showEditButton
          showDetailButton
          disableEditButton
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
    onGetData: (params) => dispatch(viewCourseRequest(params)),
    onChangePage: (params) => dispatch(viewCourseChangePage(params)),
    onChangeRowsPerPage: (params) => dispatch(viewCourseChangeRow(params)),
    onChooseItemsData: (params) => dispatch(viewCourseChooseItem(params)),
    onDeleteItems: (params) => dispatch(viewCourseDeleteItem(params)),
    onChangeSearchText: (params) => dispatch(viewCourseSearchText(params)),
    onSelectEdit: (params) => dispatch(viewCourseSelectEdit(params)),
    onSelectDetail: (params) => dispatch(viewCourseSelectDetail(params)),
    onSelectRow: (params) => dispatch(viewCourseSelectRow(params)),
    onReset: (params) => dispatch(reset(params)),
    onCloseDialog: (params) => dispatch(onCloseDialog(params)),
    onOpenDialog: (params) => dispatch(onOpenDialog(params)),
    onChange: (params) => dispatch(onChange(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(ViewCourse);
