import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import StudentCourseDetail from "./DetailCourse/Loadable";

export default function Courses() {
  const showContentMain = () => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
  return <div>{showContentMain()}</div>;
}
