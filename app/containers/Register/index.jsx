// import React, {memo, useEffect, useState} from "react";
// import {makeStyles} from "@material-ui/core/styles";
// import {useInjectReducer} from "utils/injectReducer";
// import {useInjectSaga} from "utils/injectSaga";
// import {compose} from "redux";
// import {connect} from "react-redux";
// import {createStructuredSelector} from "reselect";
//
// import Container from "@material-ui/core/Container";
// import HeaderContainer from "./Header";
// import reducer from "./reducer";
// import saga from "./saga";
// import {loginRequest} from "./action";
// import {makeSelectProfile, makeSelectRouter} from "./selectors";
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//         background: "#f5f5f5"
//     }
// }));
//
// function Login(props) {
//     useInjectReducer({key: "login", reducer});
//     useInjectSaga({key: "login", saga});
//
//     const classes = useStyles();
//
//     const [values, setValues] = useState({
//         userName: "",
//         password: "",
//     });
//
//     useEffect(() => {
//         if (props.dataInfo.permission === "admin") {
//             window.location.href = "/admin/dashboard";
//             // history.push('/admin/dashboard');
//         }
//         if (props.dataInfo.permission === "student") {
//             window.location.href = "/student";
//             // history.push('/student');
//         }
//     }, [props.dataInfo.permission]);
//
//     const handleChange = (prop) => (event) => {
//         setValues({...values, [prop]: event.target.value});
//     };
//
//     const handleClickShowPassword = () => {
//         setValues({...values, showPassword: !values.showPassword});
//     };
//
//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };
//
//     const renderAuthUrl = (e) => {
//         e.preventDefault();
//         props.onSubmit(values);
//     };
//
//     return (
//         // <div className={classes.root}>
//         //     <Helmet defaultTitle={`${APP.TITLE}`}>
//         //         <meta name="description" content="REACT"/>
//         //     </Helmet>
//         //     <Container maxWidth="md">
//         //         <HeaderContainer/>
//         //     </Container>
//         // </div>
//         <div className={classes.root}>
//             <Container maxWidth="md">
//                 <HeaderContainer/>
//             </Container>
//         </div>
//     );
// }
//
// // Lay du lieu ve
// const mapStateToProps = createStructuredSelector({
//     dataInfo: makeSelectProfile(),
//     router: makeSelectRouter(),
// });
//
// // ban action len store
// export function mapDispatchToProps(dispatch) {
//     return {
//         onSubmit: (params) => dispatch(loginRequest(params)),
//     };
// }
//
// const withConnect = connect(mapStateToProps, mapDispatchToProps);
//
// export default compose(withConnect, memo)(Login);


import React from "react";
import Container from "@material-ui/core/Container";
import HeaderContainer from "./Header";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        background: "#e9f2e8"
    }
}));

export default function App() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container maxWidth="md">
                <HeaderContainer/>
            </Container>
        </div>
    );
}
