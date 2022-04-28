
import { callApiWithAuth } from "../request";

const API = {
  data: {
    getData: (params) => {
      return callApiWithAuth(`data/getData`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    getRestoreData: (params) => {
      return callApiWithAuth(`data/getRestoreData`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
    getRemoveData: (params) => {
      return callApiWithAuth(`data/getRemoveData`, "POST", params).then(
        (res) => {
          return res;
        }
      );
    },
  }
};

export default API;
