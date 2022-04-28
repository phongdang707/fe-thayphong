import React from 'react';

import Dashboard from './Dashboard/Loadable';
import Students from './Students/Loadable';
import Sources from './Sources/Loadable';
import Courses from './Courses/Loadable';
import Exam from './Exam/Loadable';

import APP from '../../appConfig';

// import App from '../App';

const PREFIX = `${APP.PREFIX}admin`;
const routes = [
  {
    path: `${PREFIX}/dashboard`,
    exact: true,
    private: true,
    main: () => <Dashboard />,
  },
  {
    path: `${PREFIX}/exam`,
    exact: false,
    private: true,
    main: () => <Exam />,
  },
  {
    path: `${PREFIX}/student`,
    exact: false,
    private: true,
    main: () => <Students />,
  },
  {
    path: `${PREFIX}/courses`,
    exact: false,
    private: true,
    main: () => <Courses />,
  },
  {
    path: `${PREFIX}/sources`,
    exact: true,
    private: true,
    main: () => <Sources />,
  },
  {
    path: `${PREFIX}`,
    exact: false,
    private: true,
    main: () => <Dashboard />,
  },
];

export default routes;
