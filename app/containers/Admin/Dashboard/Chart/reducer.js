import produce from "immer";
import Types from "./constants";

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  data: [],
  course: "",
  courseItem: [],
  test: "",
  testItem: [],
  headCells: [
    {
      id: "1",
      defaultValue: "student_name",
      numeric: false,
      disablePadding: true,
      label: "Học sinh",
      maxWord: 20,
    },
    {
      id: "2",
      defaultValue: "correct",
      numeric: false,
      disablePadding: true,
      label: "Câu đúng",
    },
    {
      id: "3",
      defaultValue: "score",
      numeric: false,
      disablePadding: true,
      label: "Số điểm",
      type: "customScore",
    },
    {
      id: "4",
      defaultValue: "create_at",
      numeric: false,
      disablePadding: true,
      label: "Ngày thi",
      type: "date",
    },
  ],
  headCellsUndone: [
    {
      id: "1",
      numeric: false,
      disablePadding: true,
      label: "STT",
      type: "autoIncreaseNumber",
    },
    {
      id: "2",
      defaultValue: "full_name",
      numeric: false,
      disablePadding: true,
      label: "Học sinh",
    },
  ],
  rows: [],
  page: 0,
  totalItems: 0,
  rowsPerPage: 5,
  showTable: false,
  grade: "",
  undone: [],
  total: 0,
  barChart: [
    {
      name: "Điểm kém (0 - 3.5)",
      "học sinh": 0,
      color: "#8884D8",
    },
    {
      name: "Điểm yếu (3.5 - 5)",
      "học sinh": 0,
      color: "#D0ED57",
    },
    {
      name: "Điểm TB (5 - 6.5)",
      "học sinh": 0,
      color: "#A4DE6C",
    },
    {
      name: "Điểm khá (6.5 - 8)",
      "học sinh": 0,
      color: "#82CA9D",
    },
    {
      name: "Điểm giỏi (8 - 10)",
      "học sinh": 0,
      color: "#8DD1E1",
    },
  ],
  openDialogConfirm: false,
  selectRow: "",
  isSucess: false,
  messageToast: { mess: "", type: "success" },
};

/* eslint-disable default-case, no-param-reassign */
const adminDashboardReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Types.ONCHANGE_DASHBOARD:
        switch (Object.keys(action.payload)[0]) {
          case "grade":
            draft.grade = action.payload.grade;
            let itemList = [];
            draft.data.map((item, index) => {
              if (action.payload.grade == item.grade)
                itemList.push({ value: index + 1, lable: item.name_course });
            });
            draft.courseItem = itemList;
            break;
          case "course":
            draft.course = action.payload.course;
            let itemListTestCourse = [];
            draft.data[action.payload.course - 1].exams.map((item) => {
              itemListTestCourse.push({
                value: item._id,
                lable: item.name_exam,
              });
            });
            draft.testItem = itemListTestCourse;
            break;
          case "test":
            draft.test = action.payload.test;
            draft.barChart = initialState.barChart;
            break;
          case "reset":
            draft.grade = "";
            draft.test = "";
            draft.course = "";
            draft.showTable = false;
            draft.barChart = initialState.barChart;
            break;
          default:
            break;
        }
        return;
      case Types.INIT:
        draft.loading = true;
        return;
      case Types.INIT_DONE:
        draft.data = action.payload;
        draft.loading = false;
        return;
      case Types.RESET:
        return initialState;
      case Types.GET_RESULT_DASHBOARD:
        draft.loading = true;
        return;
      case Types.VIEW_CHANGE_PAGE:
        draft.page = action.payload;
        draft.barChart = initialState.barChart;
        break;
      case Types.VIEW_CHANGE_ROW:
        draft.rowsPerPage = action.payload;
        draft.page = 0;
        draft.barChart = initialState.barChart;
        break;
      case Types.GET_RESULT_DASHBOARD_DONE:
        draft.loading = false;
        draft.showTable = true;
        draft.rows = action.payload.data;
        draft.totalItems = action.payload.length;
        draft.undone = action.payload.undone;
        draft.total = action.payload.total;
        action.payload.stat.map((item) => {
          if (item.score < 3.5 && item.score >= 0)
            draft.barChart[0][`học sinh`]++;
          if (item.score >= 3.5 && item.score < 5)
            draft.barChart[1][`học sinh`]++;
          if (item.score >= 5 && item.score < 6.5)
            draft.barChart[2][`học sinh`]++;
          if (item.score >= 6.5 && item.score < 8)
            draft.barChart[3][`học sinh`]++;
          if (item.score >= 8) draft.barChart[4][`học sinh`]++;
        });
        return;
      case Types.REMOVEW_DATA:
        draft.loading = true;
        break;
      case Types.REMOVEW_DATA_SUCCESS:
        draft.isSucess = true;
        // draft.loading = false;
        draft.messageToast.type = "success";
        draft.messageToast.mess = "Xóa dữ liệu thành công";
        break;
      case Types.VIEW_DIALOG_CLOSE:
        draft.openDialogConfirm = false;
        break;
      case Types.VIEW_DIALOG_OPEN:
        draft.selectRow = action.payload.id;
        draft.openDialogConfirm = true;
        break;
    }
  });

export default adminDashboardReducer;
