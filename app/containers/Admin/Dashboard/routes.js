import React from 'react';

import Chart from './Chart/Loadable';
import Data from './Data/Loadable';

import APP from '../../../appConfig';

// import App from '../App';

const PREFIX = `${APP.PREFIX}admin/dashboard`;
const routes = [
  {
    path: `${PREFIX}/data`,
    exact: false,
    private: true,
    main: () => <Data />,
  },
  {
    path: `${PREFIX}/chart`,
    exact: false,
    private: true,
    main: () => <Chart />,
  },
  {
    path: `${PREFIX}`,
    exact: false,
    private: true,
    main: () => <Chart />,
  },
];

export default routes;
