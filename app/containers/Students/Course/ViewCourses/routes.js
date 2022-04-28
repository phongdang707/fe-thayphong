import React from "react";

import StudentCourse from "./Loadable";
import StudentCourseDetail from "./DetailCourse/Loadable";

import APP from "../../../appConfig";

const PREFIX = `${APP.PREFIX}/student/course`;
const routes = [
  {
    path: `${PREFIX}/detail-course`,
    exact: false,
    private: false,
    main: () => <StudentCourseDetail />,
  },
  {
    path: `${PREFIX}`,
    exact: false,
    private: false,
    main: () => <StudentCourse />,
  },
];

export default routes;
