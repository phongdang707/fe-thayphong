/* eslint-disable arrow-body-style */
import { callApiWithAuth } from "../request";
// import URL_API from "../config/common";
// import { getEntryV2 } from "./utils";

const API = {
  quiz: {
    getQuizById: (params) => {
      return callApiWithAuth(`quiz/getQuizById`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    create: (params) => {
      return callApiWithAuth(`quiz/newQuiz`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    edit: (params) => {
      return callApiWithAuth(`quiz/editQuiz`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    delete: (params) => {
      return callApiWithAuth(`quiz/deleteQuiz`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
  },
};

export default API;
