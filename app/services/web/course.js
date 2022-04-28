/* eslint-disable arrow-body-style */
import { callApiWithAuth } from "../request";
// import URL_API from "../config/common";
// import { getEntryV2 } from "./utils";

const API = {
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
    edit: (params) => {
      return callApiWithAuth(`courses/editCourse`, "POST", params).then(
        (res) => {
          return res;
        }
      );editCourse
    },
    checkInfoToCreate: (params) => {
      return callApiWithAuth(`courses/checkInfo`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    delete:(params) => {
      return callApiWithAuth(`courses/deleteCourse`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    getCourseById:(params) => {
      return callApiWithAuth(`courses/getCourseById`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    getDetailCourseById:(params) => {
      return callApiWithAuth(`courses/getDetailCourseById`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    getDetailStudentCourse:(params) => {
      return callApiWithAuth(`courses/getDetailStudentCourse`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    getCourseAndTest:(params) => {
      return callApiWithAuth(`courses/getCourseAndTest`, "GET", params).then(
        (res) => {
          return res;
        }
      );
    },
    changeStatus:(params) => {
      return callApiWithAuth(`courses/changeStatus`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
  },
};

export default API;
