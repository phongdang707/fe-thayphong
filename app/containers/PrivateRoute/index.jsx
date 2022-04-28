import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../services/storage";
import { callApiWithAuth } from "../../services/request";
import { getLocalStorage, setLocalStorage } from "../../services/storage";
import APIWithUser from "../../services/user";

function goLoginPage() {
  window.location.href = `${window.location.origin}/login`;
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [data, setData] = useState([]);

  const [pr, setPr] = useState("");

  async function fetchData() {
    try {
      const response = await callApiWithAuth("users/profile", "GET");
      if (response.status === 200) {
        setData(response);
      }
    } catch (error) {
      goLoginPage();
    }

    // if (getLocalStorage("logo")) {
    //   let auth = getLocalStorage("logo");
    //   if (auth === "logo.png") {
    //     setPr("admin");
    //   }
    //   if (auth === "logo.jpg") {
    //     setPr("student");
    //   }
    // } else {
    //   fetchData();
    // }
  }
  useEffect(() => {
    fetchData();
  }, []);

  // if (
  //   typeof data.data !== "undefined" &&
  //   data.data &&
  //   data.data.permission &&
  //   !getLocalStorage("logo")
  // ) {
  //   String(data.data.permission) === "admin"
  //     ? setLocalStorage("logo", "logo.png")
  //     : setLocalStorage("logo", "logo.jpg");
  // }
  if (pr !== "") {
    return (
      <Route
        {...rest}
        render={(props) =>
          rest.permission.includes(pr) === true ? (
            <Component {...props} />
          ) : (
            goLoginPage()
          )
        }
      />
    );
  }

  if (typeof data.data !== "undefined") {
    return (
      <Route
        {...rest}
        render={(props) =>
          rest.permission.includes(data.data.permission) === true ? (
            <Component {...props} />
          ) : (
            goLoginPage()
          )
        }
      />
    );
  }
  return null;
};
