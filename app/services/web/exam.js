/* eslint-disable arrow-body-style */
import { callApiWithAuth } from "../request";
// import URL_API from "../config/common";
// import { getEntryV2 } from "./utils";

const API = {
  exam: {
    create: (params) => {
      return callApiWithAuth(`exams/newExam`, "POST", params).then((res) => {
        return res;
      });
    },
    edit: (params) => {
      return callApiWithAuth(`exams/editExam`, "POST", params).then((res) => {
        return res;
      });
    },
    getList: (params) => {
      return callApiWithAuth(`exams/getAllExam`, "POST", params).then((res) => {
        return res;
      });
    },
    getExamById: (params) => {
      return callApiWithAuth(`exams/getExamById`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    delete: (params) => {
      return callApiWithAuth(`exams/deleteExam`, "POST", params).then((res) => {
        return res;
      });
    },
  },
};

export default API;
