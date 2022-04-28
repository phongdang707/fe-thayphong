import React, { memo, useEffect, useState } from "react";
import Table from "components/Common/Table";
import Selector from "components/Common/UISelector";
import Button from "components/Common/Button";
import ConfirmDialog from "components/Common/ConfirmDialog";
import Modal from "components/Common/ModalCallback";
import { Helmet } from "react-helmet";
import {
  Typography,
  Paper,
  Grid,
  IconButton,
  Link,
  Divider,
  Breadcrumbs,
} from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { useToasts } from "react-toast-notifications";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Loading from "components/Loading";
import { Backspace } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import reducer from "./reducer";
import saga from "./saga";
import {
  init,
  onReset,
  onChange,
  getResult,
  viewChangePage,
  viewChangeRow,
  onCloseDialog,
  onOpenDialog,
  onRemoveData,
} from "./action";
import { makeSelectData } from "./selectors";
import { Wrapper } from "./styled";

const useStyles = makeStyles({
  selectDrop: {
    minWidth: "100%",
  },
  disableDiv: {
    pointerEvents: "none",
    opacity: 0.8,
  },
  headerTable: {
    borderLeft: "5px solid #376fd0",
    margin: "20px 0",
    paddingLeft: "5px",
    fontWeight: "600",
  },
  heading: {
    fontWeight: "600",
  },
  hr: {
    margin: "24px 0",
  },
  breadCrumbs: {
    fontSize: "13px",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

function AdminDashboard(props) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  useInjectReducer({ key: "adminDashboard", reducer });
  useInjectSaga({ key: "adminDashboard", saga });
  const { addToast } = useToasts();

  useEffect(() => {
    props.onGetData();
    return () => {
      props.onReset();
    };
  }, []);

  useEffect(() => {
    if (props.dataDashboard.test) props.getResult();
  }, [props.dataDashboard.page, props.dataDashboard.rowsPerPage]);

  useEffect(() => {
    if (props.dataDashboard.isSucess === true) {
      addToast(props.dataDashboard.messageToast.mess, {
        appearance: props.dataDashboard.messageToast.type,
        autoDismiss: true,
      });
    }
  }, [props.dataDashboard.isSucess]);

  const callback = (type, data) => {
    switch (type) {
      case "CANCEL":
        setOpenModal(!openModal);
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <Loading isLoading={props.dataDashboard.loading} />
      <Helmet defaultTitle="Thống kê khóa học">
        <meta name="description" content="REACT" />
      </Helmet>
      <Typography variant="h6" className={classes.heading}>
        Thống kê khóa học
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
        <Link color="inherit">Admin</Link>
        <Link color="textPrimary" aria-current="page">
          Thống kê khóa học
        </Link>
      </Breadcrumbs>
      <Divider className={classes.hr}></Divider>
      <Grid spacing={3} container>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.headerTable}>
            Chọn thông tin thống kê theo khóa học
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          className={
            props.dataDashboard.course != "" ? classes.disableDiv : null
          }
        >
          <Selector
            className={classes.selectDrop}
            onChange={(event) => {
              props.onChange({ grade: event });
            }}
            valueItem={[
              { lable: "10", value: "10" },
              { lable: "11", value: "11" },
              { lable: "12", value: "12" },
            ]}
            label="Khối"
            value={props.dataDashboard.grade}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          className={
            props.dataDashboard.test != "" || props.dataDashboard.grade == ""
              ? classes.disableDiv
              : null
          }
        >
          <Selector
            className={classes.selectDrop}
            onChange={(event) => {
              props.onChange({ course: event });
            }}
            valueItem={props.dataDashboard.courseItem}
            label="Khóa học"
            value={props.dataDashboard.course}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          className={
            props.dataDashboard.course == "" ? classes.disableDiv : null
          }
        >
          <Selector
            className={classes.selectDrop}
            onChange={(event) => {
              props.onChange({ test: event });
              props.getResult();
            }}
            valueItem={props.dataDashboard.testItem}
            label="Bài thi"
            value={props.dataDashboard.test}
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <IconButton
            onClick={(event) => {
              props.onChange({ reset: true });
            }}
            color="primary"
          >
            <Backspace />
          </IconButton>
        </Grid>
      </Grid>
      {props.dataDashboard.showTable ? (
        <Grid spacing={3} container>
          <Grid item xs={12}>
            <div className={classes.titleDiv}>
              <Typography variant="h6" className={classes.headerTable}>
                Học sinh tham gia bài thi ({props.dataDashboard.totalItems}/
                {props.dataDashboard.total})
              </Typography>
              <Button
                style={{ height: "fit-content" }}
                content="Học sinh chưa làm bài"
                onClick={() => setOpenModal(!openModal)}
              />
            </div>
            <Table
              rows={props.dataDashboard.rows}
              headCells={props.dataDashboard.headCells}
              showCheckbox={false}
              showHeader={false}
              passPage={props.dataDashboard.page}
              passRowsPerPage={props.dataDashboard.rowsPerPage}
              totalItems={props.dataDashboard.totalItems}
              onChangePage={props.onChangePage}
              onChangeRowsPerPage={props.onChangeRowsPerPage}
              showDeleteButton
              selectRemove={props.onOpenDialog}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.headerTable}>
              Thống kê điểm số
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart data={props.dataDashboard.barChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="học sinh" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <ResponsiveContainer width={"100%"} height={300}>
              <PieChart>
                <Tooltip />
                <Legend fill="color" />
                <Pie
                  data={props.dataDashboard.barChart}
                  dataKey="học sinh"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="color"
                  label
                >
                  {props.dataDashboard.barChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      ) : null}
      <Modal
        header="Danh sách học sinh chưa làm bài"
        contentCancel="Thoát"
        openModal={openModal}
        hidePositiveButton={true}
        body={
          <Table
            rows={props.dataDashboard.undone}
            headCells={props.dataDashboard.headCellsUndone}
            showCheckbox={false}
            showHeader={false}
            showFooter={false}
          />
        }
        callback={callback}
      ></Modal>
      <ConfirmDialog
        isOpenDialog={props.dataDashboard.openDialogConfirm}
        onCloseDialog={props.onCloseDialog}
        onPositiveChoice={props.onRemoveData}
        title="Xóa kết quả"
        content="Học sinh có thể tiến hành làm lại nếu như xóa kết quả này"
      />
    </Wrapper>
  );
}
const mapStateToProps = createStructuredSelector({
  dataDashboard: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onReset: (params) => dispatch(onReset(params)),
    onGetData: (params) => dispatch(init(params)),
    onChange: (params) => dispatch(onChange(params)),
    getResult: (params) => dispatch(getResult(params)),
    onChangePage: (params) => dispatch(viewChangePage(params)),
    onChangeRowsPerPage: (params) => dispatch(viewChangeRow(params)),
    onCloseDialog: (params) => dispatch(onCloseDialog(params)),
    onOpenDialog: (params) => dispatch(onOpenDialog(params)),
    onRemoveData: (params) => dispatch(onRemoveData(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(AdminDashboard);
