import React from 'react';

import AddCourse from './AddCourseByStep/Loadable';
import ViewCourses from './ViewCourses/Loadable';
import AddContent from './AddContent/Loadable';
import DetailCourse from './DetailCourse/Loadable';

import APP from '../../../appConfig';

// import App from '../App';

const PREFIX = `${APP.PREFIX}admin/courses`;
const routes = [
  {
    path: `${PREFIX}/addContent`,
    exact: false,
    private: true,
    main: () => <AddContent />,
  },
  {
    path: `${PREFIX}/addCourse`,
    exact: false,
    private: true,
    main: () => <AddCourse />,
  },
  {
    path: `${PREFIX}/viewCourse`,
    exact: false,
    private: true,
    main: () => <AddCourse />,
  },
  {
    path: `${PREFIX}/detailCourse`,
    exact: false,
    private: true,
    main: () => <DetailCourse />,
  },
  {
    path: `${PREFIX}`,
    exact: false,
    private: true,
    main: () => <ViewCourses />,
  },
];

export default routes;
