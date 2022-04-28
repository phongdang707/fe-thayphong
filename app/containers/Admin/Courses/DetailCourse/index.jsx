import React, { useEffect, useState, memo } from "react";
import ConfirmDialog from "components/Common/ConfirmDialog";
import { Breadcrumbs, Divider,Link, Typography, Grid, Chip,Tabs,Tab,Checkbox } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useToasts } from "react-toast-notifications";
import LocalLibrary from "@material-ui/icons/LocalLibrary";
import DoneIcon from "@material-ui/icons/Done";
import Loading from "components/Loading";
import Modal from "components/Common/ModalCallback";
import Button from "components/Common/Button";
import Table from "components/Common/Table";
import Input from "components/Common/Input";
import parse from "html-react-parser";
import reducer from "./reducer";
import saga from "./saga";
import {
  getDetailCourse,
  reset,
  onChange,
  viewExamChangePage,
  viewExamChangeRow,
  viewExamChangePageTest,
  viewExamChangeRowTest,
  viewExamChangePageStudent,
  viewExamChangeRowStudent,
  viewExamSearchText,
  viewExamRequest,
  viewExamSelectRow,
  onPostNewTest,
  postChangeStatus,
  selectRow,
  onCloseDialog,
  onOpenDialog,
} from "./action";
import { makeSelectData } from "./selectors";
import { Wrapper, WrapperContentTable } from "./styled";

const useStyles = makeStyles({
  heading: {
    fontWeight: "600",
  },
  imagePrev: {
    height: 100,
  },
  marginText: {
    marginRight: "2em",
  },
  headerTable: {
    borderLeft: "5px solid #376fd0",
    margin: "20px 0",
    paddingLeft: "5px",
    fontWeight: "600",
  },
  marginText: {
    marginRight: "2em",
  },
  changeStateModal: {
    padding: "1em",
    display: "flex",
  },
  unselectedChip: {
    padding: "0.6em",
    margin: "0 1em",
  },
  selectedChip: {
    padding: "0.5em",
    borderWidth: "0.5px",
    borderStyle: "solid",
    margin: "0 1em",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textRow: {
    display: "flex",
  },
  hr: {
    margin: "24px 0",
  },
  breadCrumbs: {
    fontSize: "13px",
  },
  ansDiv: {
    display: "flex",
    alignItems: "center",
  },
});

const style = {};

function DetailCourse(props) {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);
  const [openModalChangeStatus, setOpenModalChangeStatus] = useState(false);
  const [flag, setFlag] = useState(false);
  useInjectReducer({ key: "detailCourse", reducer });
  useInjectSaga({ key: "detailCourse", saga });
  const { addToast } = useToasts();

  const callback = (type, data) => {
    switch (type) {
      case "CANCEL":
        setOpenModal(!openModal);
        break;
      case "SUBMIT":
        setOpenModal(!openModal);
        props.postTest();
        break;
      default:
        break;
    }
  };

  const callback_changeStatus = (type, data) => {
    switch (type) {
      case "CANCEL":
        setOpenModalChangeStatus(!openModalChangeStatus);
        break;
      case "SUBMIT":
        setOpenModalChangeStatus(!openModalChangeStatus);
        props.postChangeStatus();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (props.dataDetail.isSucess === true) {
      addToast(props.dataDetail.messageToast.mess, {
        appearance: props.dataDetail.messageToast.type,
        autoDismiss: true,
      });
      setFlag(!flag)
    }
    return () => {
      props.onReset();
    };
  }, [props.dataDetail.isSucess]);

  useEffect(() => {
    props.onGetDetailCourse();
  }, [
    props.dataDetail.pageTest,
    props.dataDetail.rowsPerPageTest,
    props.dataDetail.pageStudent,
    props.dataDetail.rowsPerPageStudent,
    flag
  ]);

  useEffect(() => {
    props.onGetDataExam();
  }, [
    props.dataDetail.page,
    props.dataDetail.grade,
    props.dataDetail.rowsPerPage,
    props.dataDetail.searchText,
  ]);

  useEffect(() => {
    if (openModalChangeStatus)
      props.onChange({ status: props.dataDetail.status });
  }, [openModalChangeStatus]);

  return (
    <Wrapper>
      <Loading isLoading={props.dataDetail.loading} />
      <Helmet defaultTitle="Chi tiết Khóa học">
        <meta name="description" content="REACT" />
      </Helmet>
      <Typography variant="h6" className={classes.heading}>
        Chi tiết Khóa học
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
        <Link
          color="inherit"
        >
          Admin
        </Link>
        <Link
          color="inherit"
        >
          Khóa học
        </Link>
        <Link color="textPrimary" aria-current="page">
          Chi tiết Khóa học
        </Link>
      </Breadcrumbs>
      <Divider className={classes.hr}></Divider>
      <Typography variant="h6" className={classes.headerTable}>
        Thông tin khóa học
      </Typography>
      <Typography>Tên khóa học: {props.dataDetail.name_course}</Typography>
      <Typography>Mô tả:</Typography>
      {props.dataDetail.description
        ? parse(props.dataDetail.description)
        : null}
      <div className={classes.textRow}>
        <Typography className={classes.marginText}>Trạng thái</Typography>
        {props.dataDetail.status ? (
          <Chip
            variant="outlined"
            size="small"
            onClick={() => setOpenModalChangeStatus(!openModalChangeStatus)}
            icon={<LocalLibrary />}
            label="Đang dạy"
            clickable
            color="primary"
          />
        ) : (
          <Chip
            variant="outlined"
            size="small"
            onClick={() => setOpenModalChangeStatus(!openModalChangeStatus)}
            icon={<DoneIcon />}
            label="Đã hoàn thành"
            clickable
            color="secondary"
          />
        )}
      </div>
      <WrapperContentTable>
        <div className={classes.titleDiv}>
          <Typography variant="h6" gutterBottom className={classes.headerTable}>
            Danh sách bài thi
          </Typography>
          <Button
            style={{ height: "fit-content" }}
            content="Thêm bài thi"
            onClick={() => setOpenModal(!openModal)}
            disabled={!props.dataDetail.status}
          />
        </div>
        <Table
          rows={props.dataDetail.test_list}
          headCells={props.dataDetail.headCells_test}
          showCheckbox={false}
          showHeader={false}
          selectRow={props.onOpenDialog}
          passPage={props.dataDetail.pageTest}
          passRowsPerPage={props.dataDetail.rowsPerPageTest}
          totalItems={props.dataDetail.totalItemsTest}
          onChangePage={props.onChangePageTest}
          onChangeRowsPerPage={props.onChangeRowsPerPageTest}
        />
      </WrapperContentTable>
      <WrapperContentTable>
        <Typography variant="h6" gutterBottom className={classes.headerTable}>
          Danh sách học sinh
        </Typography>
        <Table
          rows={props.dataDetail.student_list}
          headCells={props.dataDetail.headCells_students}
          showCheckbox={false}
          showHeader={false}
          passPage={props.dataDetail.pageStudent}
          passRowsPerPage={props.dataDetail.rowsPerPageStudent}
          totalItems={props.dataDetail.totalItemsStudent}
          onChangePage={props.onChangePageStudent}
          onChangeRowsPerPage={props.onChangeRowsPerPageStudent}
        />
      </WrapperContentTable>

      <Modal
        header="Thêm bài thi"
        contentCancel="Thoát"
        contentSubmit="Xác nhận"
        openModal={openModal}
        buttonPositiveDisable={
          props.dataDetail.exam_name.value.trim() == "" ||
          !props.dataDetail.number_quiz.value ||
          props.dataDetail.exam_time == "" ||
          props.dataDetail.number_quiz.error ||
          !props.dataDetail.exam_time
        }
        body={
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Tabs
                  value={props.dataDetail.gradeTab}
                  onChange={(event, newValue) => {
                    props.onChange({gradeTab:newValue});
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
                  rows={props.dataDetail.exams}
                  headCells={props.dataDetail.headCells}
                  passPage={props.dataDetail.page}
                  passRowsPerPage={props.dataDetail.rowsPerPage}
                  totalItems={props.dataDetail.totalItems}
                  selectRow={props.onSelectRowExam}
                  onChangePage={props.onChangePage}
                  onChangeRowsPerPage={props.onChangeRowsPerPage}
                  onChangeSearchText={(event) => {
                    const { value } = event.target;
                    props.onChangeSearchText(value);
                  }}
                  orderBy="create_at"
                  showCheckbox={false}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  label="Tên bài thi"
                  value={props.dataDetail.exam_name.value}
                  fullWidth
                  placeholder="Chọn bài thi từ bảng trên"
                  onChange={(event) => {
                    const { value } = event.target;
                    props.onChange({ exam_name: value });
                  }}
                  helperText={props.dataDetail.exam_name.listErros}
                  error={props.dataDetail.exam_name.error}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Input
                  type="number"
                  label="Số câu trong bài thi"
                  value={props.dataDetail.number_quiz.value}
                  fullWidth
                  placeholder="Số câu chọn lọc ngẫu nhiên"
                  onChange={(event) => {
                    const { value } = event.target;
                    props.onChange({ number_quiz: value });
                  }}
                  helperText={props.dataDetail.number_quiz.listErros}
                  error={props.dataDetail.number_quiz.error}
                  inputProps={{ min: 0, max: props.dataDetail.max_quiz }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Input
                  type="number"
                  label="Thời gian làm bài (phút)"
                  value={props.dataDetail.exam_time}
                  fullWidth
                  onChange={(event) => {
                    const { value } = event.target;
                    props.onChange({ exam_time: value });
                  }}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} md={4} className={classes.ansDiv}>
                <Checkbox
                  color="primary"
                  checked={props.dataDetail.isSuffer}
                  onChange={() =>
                    props.onChange({ isSuffer: "change" })
                  }
                />
                <Typography >
                  Trộn câu hỏi (*sử dụng cho bộ câu hỏi lớn hơn số câu xuất hiện trong bài thi)
                </Typography>
              </Grid>
            </Grid>
          </div>
        }
        callback={callback}
      ></Modal>
      <Modal
        header="Đổi trạng thái khóa học"
        contentCancel="Thoát"
        contentSubmit="Xác nhận"
        openModal={openModalChangeStatus}
        body={
          <div className={classes.changeStateModal}>
            <div
              className={
                props.dataDetail.selectStatus
                  ? classes.selectedChip
                  : classes.unselectedChip
              }
            >
              <Chip
                variant="outlined"
                size="small"
                icon={<LocalLibrary />}
                label="Đang dạy"
                clickable
                color="primary"
                onClick={() => props.onChange({ changeStatus: true })}
              />
            </div>
            <div
              className={
                !props.dataDetail.selectStatus
                  ? classes.selectedChip
                  : classes.unselectedChip
              }
            >
              <Chip
                variant="outlined"
                size="small"
                icon={<DoneIcon />}
                label="Đã hoàn thành"
                clickable
                color="secondary"
                onClick={() => props.onChange({ changeStatus: false })}
              />
            </div>
          </div>
        }
        callback={callback_changeStatus}
      ></Modal>
      <ConfirmDialog
        isOpenDialog={props.dataDetail.openDialogConfirm}
        onCloseDialog={props.onCloseDialog}
        onPositiveChoice={props.onSelectRow}
        title="Xác nhận chuyển đổi trạng thái bài thi"
      />
    </Wrapper>
  );
}
const mapStateToProps = createStructuredSelector({
  dataDetail: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onGetDetailCourse: (params) => dispatch(getDetailCourse(params)),
    onGetDataExam: (params) => dispatch(viewExamRequest(params)),
    onReset: (params) => dispatch(reset(params)),
    onChange: (params) => dispatch(onChange(params)),
    onSelectRowExam: (params) => dispatch(viewExamSelectRow(params)),
    onChangePage: (params) => dispatch(viewExamChangePage(params)),
    onChangeRowsPerPage: (params) => dispatch(viewExamChangeRow(params)),
    onChangePageTest: (params) => dispatch(viewExamChangePageTest(params)),
    onChangeRowsPerPageTest: (params) => dispatch(viewExamChangeRowTest(params)),
    onChangePageStudent: (params) => dispatch(viewExamChangePageStudent(params)),
    onChangeRowsPerPageStudent: (params) => dispatch(viewExamChangeRowStudent(params)),
    onChangeSearchText: (params) => dispatch(viewExamSearchText(params)),
    postTest: (params) => dispatch(onPostNewTest(params)),
    postChangeStatus: (params) => dispatch(postChangeStatus(params)),
    onSelectRow: (params) => dispatch(selectRow(params)),
    onCloseDialog: (params) => dispatch(onCloseDialog(params)),
    onOpenDialog: (params) => dispatch(onOpenDialog(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(DetailCourse);
