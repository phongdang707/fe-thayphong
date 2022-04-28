import React from 'react';

import AddExam from './AddExam/Loadable';
import ViewExams from './ViewExams/Loadable';
// import AddContent from './AddContent/Loadable';

import APP from '../../../appConfig';

// import App from '../App';

const PREFIX = `${APP.PREFIX}admin/exam`;
const routes = [
  {
    path: `${PREFIX}/addExam`,
    exact: false,
    private: true,
    main: () => <AddExam />,
  },
  {
    path: `${PREFIX}/viewExam`,
    exact: false,
    private: true,
    main: () => <AddExam />,
  },
  {
    path: `${PREFIX}`,
    exact: false,
    private: true,
    main: () => <ViewExams />,
  },
];

export default routes;
