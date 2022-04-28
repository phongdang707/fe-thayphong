/* eslint-disable arrow-body-style */
import { callApiWithAuth } from "./request";
// import URL_API from "../config/common";
// import { getEntryV2 } from "./utils";

const API = {
  students: {
    getList: (params) => {
      return callApiWithAuth(`students/getStudent`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    create: (params) => {
      return callApiWithAuth(`students/register`, "POST", params).then(
        (res) => {
          // console.log("res", res);
          return res;
        }
      );
    },
  },
  courses: {
    getList: (params) => {
      return callApiWithAuth(`courses/getAllCourse`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    create: (params) => {
      return callApiWithAuth(`courses/newCourse`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
  },
};

export default API;
