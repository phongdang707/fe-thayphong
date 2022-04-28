import React from "react";

import StudentTest from "./TestCourse/Loadable";
import StudentCourse from "./ViewCourses/Loadable";
import StudentCourseDetail from "./DetailCourse/Loadable";
import StudentDoExam from "./TestCourse/DoExam/Loadable";

import APP from "../../../appConfig";

const PREFIX = `${APP.PREFIX}student/course`;
const routes = [
  {
    path: `${PREFIX}/test/do-exam`,
    exact: false,
    private: false,
    main: () => <StudentDoExam />,
  },
  {
    path: `${PREFIX}/detail-course`,
    exact: false,
    private: false,
    main: () => <StudentCourseDetail />,
  },
  {
    path: `${PREFIX}/test`,
    exact: false,
    private: false,
    main: () => <StudentTest />,
  },
  {
    path: `${PREFIX}`,
    exact: false,
    private: false,
    main: () => <StudentCourse />,
  },
];

export default routes;
