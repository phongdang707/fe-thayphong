/* eslint-disable arrow-body-style */
import { callApiWithAuth } from "../request";
// import URL_API from "../config/common";
// import { getEntryV2 } from "./utils";

const API = {
  result: {
    create: (params) => {
      return callApiWithAuth(`result/newResult`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    getQuizTest: (params) => {
      return callApiWithAuth(`result/getQuizTest`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    submit: (params) => {
      return callApiWithAuth(`result/submitTest`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    // router nay` danh cho student get all bai thi
    getResult:(params) => {
      return callApiWithAuth(`result/getResult`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    getResultTest:(params) => {
      return callApiWithAuth(`result/getResultTest`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    removeResult:(params) => {
      return callApiWithAuth(`result/removeResult`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
  },
};

export default API;
