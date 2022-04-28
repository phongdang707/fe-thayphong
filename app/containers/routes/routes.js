import React from "react";

import Admin from "../Admin/Loadable";
import Students from "../Students/Loadable";
import Intro from "../Intro/Loadable";
import PageNotFound from "../NotFoundPage/Loadable";
import Register from '../Register'

// import App from '../App';
import Login from "../login/Loadable";

const routes = [
    {
        path: "/register",
        exact: false,
        main: () => <Register/>,
    },
    {
        path: "/admin",
        exact: false,
        private: true,
        main: () => <Admin/>,
        permisson: ["admin"],
    },


    {
        path: "/login",
        exact: true,
        main: () => <Login/>,
    },
    {
        path: "/",
        exact: true,
        private: false,
        main: () => <Intro/>,
    },
    // {
    //   path: '',
    //   exact: false,
    //   private: false,
    //   main: () => <Login />,
    // },
    {
        path: "/student",
        exact: false,
        private: true,
        main: () => <Students/>,
        permisson: ["student"],
    },
    {
        path: "*",
        exact: false,
        private: false,
        main: () => <PageNotFound/>,
    },
];

export default routes;
