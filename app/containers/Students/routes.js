import React from "react";

import Home from "./Home/Loadable";
import Profile from "./Profile/Loadable";
import Course from "./Course/Loadable";
import Exam from "./Exam/Loadable";

import APP from "../../appConfig";

const PREFIX = `${APP.PREFIX}student`;
const routes = [
  {
    path: `${PREFIX}/course`,
    exact: false,
    private: true,
    main: () => <Course />,
  },
  {
    path: `${PREFIX}/profile`,
    exact: true,
    private: true,
    main: () => <Profile />,
  },
  {
    path: `${PREFIX}/exam`,
    exact: true,
    private: true,
    main: () => <Exam />,
  },
  {
    path: `${PREFIX}`,
    exact: true,
    private: true,
    main: () => <Home />,
  },
];

export default routes;
