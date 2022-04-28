import React from "react";

import StudentCourse from "./StudentCourse/Loadable";

import APP from "../../../appConfig";

const PREFIX = `${APP.PREFIX}/student`;
const routes = [
  {
    path: `${PREFIX}/course`,
    exact: false,
    private: false,
    main: () => <StudentCourse />,
  },
];

// cái này chưa cấu hình để xài đâu. nên để route bên ngoài, khi nào xong layout thì mới dùng chỗ này

export default routes;
