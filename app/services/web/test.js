/* eslint-disable arrow-body-style */
import { callApiWithAuth } from "../request";
// import URL_API from "../config/common";
// import { getEntryV2 } from "./utils";

const API = {
  test: {
    create: (params) => {
      return callApiWithAuth(`test/newTest`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    getDetailTest:(params) => {
      return callApiWithAuth(`test/getDetailStudentTest`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    changeStatus:(params) => {
      return callApiWithAuth(`test/changeStatusTest`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
  },
};

export default API;
