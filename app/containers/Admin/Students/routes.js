import React from "react";

import AddStudent from "./AddStudent/Loadable";
import ListStudent from "./ListStudent/Loadable";
import ConfirmStudent from "./ConfirmStudent/Loadable";

import APP from "../../../appConfig";

const PREFIX = `${APP.PREFIX}admin/student`;
const routes = [
  {
    path: `${PREFIX}/detail-student`,
    exact: false,
    private: true,
    main: () => <AddStudent />,
  },
  {
    path: `${PREFIX}/addStudent`,
    exact: true,
    private: true,
    main: () => <AddStudent />,
  },
  {
    path: `${PREFIX}/confirm-student`,
    exact: false,
    private: true,
    main: () => <ConfirmStudent />,
  },
  {
    path: `${PREFIX}`,
    exact: true,
    private: true,
    main: () => <ListStudent />,
  },
];

export default routes;
