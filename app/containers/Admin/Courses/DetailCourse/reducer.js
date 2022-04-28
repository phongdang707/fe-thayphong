import React from "react";
import produce from "immer";
import Types from "./constants";
import { Chip } from "@material-ui/core";
// The initial state of the App
export const initialState = {
  loading: false,
  error: "",
  id: "",
  name_course: "",
  description: "",
  imgData: null,
  status: null,
  helmet: "",
  page: 0,
  totalItems: 0,
  rowsPerPage: 5,
  pageTest: 0,
  totalItemsTest: 0,
  rowsPerPageTest: 5,
  pageStudent: 0,
  totalItemsStudent: 0,
  rowsPerPageStudent: 5,
  isSuffer:false,
  headCells_test: [
    {
      id: "1",
      defaultValue: "name_exam",
      numeric: false,
      disablePadding: true,
      label: "Tên bài thi",
      maxWord: 20,
    },
    {
      id: "2",
      defaultValue: "time",
      numeric: false,
      disablePadding: true,
      label: "Thời gian thi(p)",
    },
    {
      id: "3",
      defaultValue: "quiz_number",
      numeric: false,
      disablePadding: true,
      label: "Số câu hỏi",
    },
    {
      id: "4",
      defaultValue: "result",
      numeric: false,
      disablePadding: true,
      label: "Số lượt thi",
      type: "number",
    },
    {
      id: "5",
      defaultValue: "openTest",
      numeric: false,
      disablePadding: true,
      label: "Trạng thái",
      type: "customData",
      data: {
        trueCase: (
          <Chip size="small" label="Đang mở" clickable color="primary" />
        ),
        falseCase: (
          <Chip size="small" label="Đang đóng" clickable color="secondary" />
        ),
      },
    },
    {
      id: "6",
      defaultValue: "create_at",
      numeric: false,
      disablePadding: true,
      label: "Ngày tạo",
      type: "date",
    },
  ],
  test_list: [],
  headCells: [
    {
      id: "1",
      defaultValue: "name_exam",
      numeric: false,
      disablePadding: true,
      label: "Tên bài thi",
      maxWord: 20,
    },
    {
      id: "2",
      defaultValue: "grade",
      numeric: false,
      disablePadding: true,
      label: "Khối",
    },
    {
      id: "3",
      defaultValue: "quiz",
      numeric: false,
      disablePadding: true,
      label: "Số câu hỏi",
      type: "number",
    },
  ],
  student_list: [],
  headCells_students: [
    {
      id: "1",
      defaultValue: "full_name",
      numeric: false,
      disablePadding: true,
      label: "Tên học sinh",
      maxWord: 20,
    },
    {
      id: "3",
      defaultValue: "school",
      numeric: false,
      disablePadding: true,
      label: "Trường",
      maxWord: 20,
    },
    {
      id: "4",
      defaultValue: "grade",
      numeric: false,
      disablePadding: true,
      label: "Khối",
    },
    {
      id: "5",
      defaultValue: "class_room",
      numeric: false,
      disablePadding: true,
      label: "Lớp",
    },
  ],
  exams: [],
  searchText: "",
  exam_id: "",
  exam_name: { error: false, value: "", listErros: "" },
  max_quiz: null,
  number_quiz: { error: false, value: "", listErros: "" },
  exam_time: "",
  isSucess: false,
  messageToast: { mess: "", type: "success" },
  selectStatus: "",
  openDialogConfirm: false,
  idActive: "",
  gradeTab:0,
  grade:"10",
};

/* eslint-disable default-case, no-param-reassign */
const detailCourseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Types.DETAIL_COURSE_ONCHANGE:
        switch (Object.keys(action.payload)[0]) {
          case "number_quiz":
            draft.number_quiz.value = Number.parseInt(
              action.payload.number_quiz,
              10
            );
            if (
              action.payload.number_quiz > draft.max_quiz &&
              draft.max_quiz !== null
            ) {
              draft.number_quiz.error = true;
              draft.number_quiz.listErros = "Số câu không hợp lệ";
            } else {
              draft.number_quiz.error = false;
              draft.number_quiz.listErros = "";
            }
            break;
          case "exam_time":
            draft.exam_time = Number.parseInt(action.payload.exam_time, 10);
            break;
          case "exam_name":
            if(draft.exam_id ="") return;
            draft.exam_name.value = action.payload.exam_name;
            if (action.payload.exam_name.trim().length == 0) {
              draft.exam_name.error = true;
              draft.exam_name.listErros = "Tên bài thi không được để trống";
            } else {
              draft.exam_name.error = false;
              draft.exam_name.listErros = "";
            }
            break;
          case "status":
            draft.selectStatus = action.payload.status;
            break;
          case "changeStatus":
            draft.selectStatus = action.payload.changeStatus;
            break;
          case "isSuffer":
            draft.isSuffer = !draft.isSuffer ;
            break;
          case "gradeTab":
            draft.gradeTab = action.payload.gradeTab;
            switch (action.payload.gradeTab) {
              case 0:
                draft.grade = "10";
                draft.rowsPerPage = 5;
                draft.page = 0;
                draft.searchText = "";
                break;
              case 1:
                draft.grade = "11";
                draft.rowsPerPage = 5;
                draft.page = 0;
                draft.searchText = "";
                break;
              case 2:
                draft.grade = "12";
                draft.rowsPerPage = 5;
                draft.page = 0;
                draft.searchText = "";
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
        return;
      case Types.COURSE_GET_DETAIL:
        draft.loading = true;
        draft.error = "";
        return;
      case Types.RESET:
        return initialState;
      case Types.DETAIL_GET_SUCCESS:
        draft.loading = false;
        draft.helmet = `Khóa học ${action.payload.data.name_course}`;
        draft.id = action.payload.data._id;
        draft.test_list = action.payload.data.exams;
        draft.name_course = action.payload.data.name_course;
        draft.description = action.payload.data.description;
        draft.student_list = action.payload.data.students;
        draft.imgData = action.payload.data.banner;
        draft.status = action.payload.data.status;
        draft.totalItemsTest = action.payload.lengthTest;
        draft.totalItemsStudent = action.payload.lengthStudent;
        return;
      case Types.DETAIL_GET_FAILURE:
        return;
      case Types.DETAIL_GET_EXAM_SUCCESS:
        draft.exams = action.payload.data;
        draft.totalItems = action.payload.length;
        return;
      case Types.DETAIL_GET_EXAM_FAILURE:
        return;
      case Types.VIEW_CHANGE_PAGE:
        draft.page = action.payload;
        break;
      case Types.VIEW_CHANGE_ROW:
        draft.rowsPerPage = action.payload;
        draft.page = 0;
        break;
      case Types.VIEW_CHANGE_PAGE_TEST:
        draft.pageTest = action.payload;
        break;
      case Types.VIEW_CHANGE_ROW_TEST:
        draft.rowsPerPageTest = action.payload;
        draft.pageTest = 0;
        break;
      case Types.VIEW_CHANGE_PAGE_STUDENT:
        draft.pageStudent = action.payload;
        break;
      case Types.VIEW_CHANGE_ROW_STUDENT:
        draft.rowsPerPageStudent = action.payload;
        draft.pageStudent = 0;
        break;
      case Types.VIEW_SEARCH_TEXT:
        (draft.page = 0), (draft.searchText = action.payload);
        break;
      case Types.VIEW_SELECT_ROW:
        draft.exam_id = action.payload;
        draft.exams.map((exam) => {
          if (exam._id == action.payload) {
            draft.exam_name.value = exam.name_exam;
            draft.max_quiz = exam.quiz.length;
            draft.number_quiz.value = exam.quiz.length;
            draft.number_quiz.error = false;
            draft.number_quiz.listErros = "";
            return;
          }
        });
        break;
      case Types.VIEW_DETAIL_SUBMIT:
        draft.loading = true;
        break;
      case Types.ADD_TEST_SUCCESS:
        draft.loading = false;
        draft.messageToast.type = "success";
        draft.messageToast.mess = "Thêm thành công";
        draft.isSucess = true;
        return;
      case Types.ADD_TEST_FAILURE:
        // draft.messageToast.type= 'error';
        // draft.messageToast.mess = "Thêm thất bại";
        draft.loading = false;
        return;
      case Types.CHANGE_STATUS_COURSE:
        draft.loading = true;
        break;
      case Types.CHANGE_STATUS_COURSE_SUCCESS:
        draft.loading = false;
        draft.messageToast.type = "success";
        draft.messageToast.mess = "Đổi trạng thái thành công";
        draft.isSucess = true;
        return;
      case Types.CHANGE_STATUS_COURSE_FAILURE:
        // draft.messageToast.type= 'error';
        // draft.messageToast.mess = "Thêm thất bại";
        draft.loading = false;
        return;
      case Types.SELECT_ROW_TEST:
        draft.loading = true;
        return;
      case Types.SELECT_ROW_TEST_SUCCESS:
        draft.loading = false;
        draft.messageToast.type = "success";
        draft.messageToast.mess = "Mở/đóng bài thi thành công";
        draft.isSucess = true;
        return;
      case Types.VIEW_DIALOG_CLOSE:
        draft.openDialogConfirm = false;
        break;
      case Types.VIEW_DIALOG_OPEN:
        draft.openDialogConfirm = true;
        draft.idActive = action.payload;
        break;
    }
  });

export default detailCourseReducer;
