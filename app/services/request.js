// eslint-disable-next-line import/no-unresolved
import axios from "axios";
import { URL_API } from "../config/common";
import { getToken } from "./storage";

function goLoginPage() {
  window.location.href = `${window.location.origin}/login`;
}

const serviceUnavailbale = {
  status: true,
  data: {
    code: 503,
    message: "Service Unavailable",
  },
};
const serviceUnavailbaleLogin = (err) => {
  return (err = {
    status: true,
    data: {
      code: 503,
      message: err,
    },
  });
};

export function urlHasQueryString(url) {
  const arr = url.split("?");
  if (arr.length > 1 && arr[1] !== "") {
    return true;
  }
  return false;
}

export function callApiWithAuth(endpoint, method = "GET", body, isDownload) {
  const apiId = "";
  const apiToken = getToken();
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: apiToken,
  };

  // if (urlHasQueryString(endpoint)) {
  //   // eslint-disable-next-line no-param-reassign
  //   endpoint += `&user_id=${apiId}`;
  // } else {
  //   // eslint-disable-next-line no-param-reassign
  //   endpoint += `?user_id=${apiId}`;
  // }
  return axios({
    method,
    url: `${URL_API}/${endpoint}`,
    data: body,
    headers,
    responseType: isDownload ? "arrayBuffer" : "",
  }).catch((err) => {
    console.log("err", err.response);
    if (err.response.data.errors === "Errors!") {
      alert("Bạn đang đăng nhập ở một thiết bị khác. Vui lòng đăng nhập lại");
      goLoginPage();
    }
    // console.error(err);
    // goLoginPage();
    return serviceUnavailbale;
  });
}

export function callApi(endpoint, method = "GET", body) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
  };
  return axios({
    method,
    url: `${URL_API}/${endpoint}`,
    data: body,
    headers,
  }).catch((err) => {
    console.log(err);
    if (err.response.data.errors === "Errors!") {
      alert("Bạn đang đăng nhập ở một thiết bị khác. Vui lòng đăng nhập lại");
      goLoginPage();
    }

    return serviceUnavailbale;
  });
}

export function callApiLogin(endpoint, method = "GET", body) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
  };
  return axios({
    method,
    url: `${URL_API}/${endpoint}`,
    data: body,
    headers,
  }).catch((err) => {
    return serviceUnavailbaleLogin(err.response);
  });
}
