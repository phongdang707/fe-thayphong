/* eslint-disable arrow-body-style */
import { callApiWithAuth } from "../request";
// import URL_API from "../config/common";
// import { getEntryV2 } from "./utils";

const API = {
  contents: {
    getContentById: (params) => {
      return callApiWithAuth(`contents/getContentById`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    create: (params) => {
      return callApiWithAuth(`contents/newContent`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    edit: (params) => {
      return callApiWithAuth(`contents/editContent`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    delete: (params) => {
      return callApiWithAuth(`contents/deleteContent`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
  },
};

export default API;
