import React from "react";

// import Dashboard from './Dashboard/Loadable';
// import Students from './Students/Loadable';
// import Sources from './Sources/Loadable';
// import Courses from './Courses/Loadable';
// import Exam from './Exam/Loadable';
import Home from "./Home/Loadable";

import APP from "../../appConfig";

// import App from '../App';

const PREFIX = `${APP.PREFIX}student`;
const routes = [
  {
    path: `${PREFIX}`,
    exact: true,
    private: true,
    main: () => <Home />,
  },
];

export default routes;
