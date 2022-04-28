import React, {memo, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import {Button, IconButton, InputAdornment} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {Helmet} from "react-helmet";
import {useInjectReducer} from "utils/injectReducer";
import {useInjectSaga} from "utils/injectSaga";
import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import APP from "../../appConfig";
import {Wrapper} from "./styles";
import reducer from "./reducer";
import saga from "./saga";
import {loginRequest} from "./action";
import {makeSelectProfile, makeSelectRouter} from "./selectors";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    root: {
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        background: `url(${APP.BACKGROUND_LOGIN})`,
    },
    paper: {
        padding: "50px",
        margin: "auto",
        maxWidth: 500,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
    checkBox: {},
    title: {
        width: "100%",
        textAlign: "center",
    },
    textField: {
        marginTop: "15px",
        width: "100%",
    },
    button: {
        width: "100%",
    },
}));

function Login(props) {
    useInjectReducer({key: "login", reducer});
    useInjectSaga({key: "login", saga});

    const classes = useStyles();

    const [values, setValues] = useState({
        userName: "",
        password: "",
    });

    useEffect(() => {
        if (props.dataInfo.permission === "admin") {
            window.location.href = "/admin/dashboard";
            // history.push('/admin/dashboard');
        }
        if (props.dataInfo.permission === "student") {
            window.location.href = "/student";
            // history.push('/student');
        }
    }, [props.dataInfo.permission]);

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const renderAuthUrl = (e) => {
        e.preventDefault();
        props.onSubmit(values);
    };

    return (
        <div className={classes.root}>
            <Helmet defaultTitle={`${APP.TITLE}`}>
                <meta name="description" content="REACT"/>
            </Helmet>
            <div style={{paddingTop: "40px"}}>
                <Paper className={classes.paper}>
                    <Grid item xs={12} sm container>
                        <img src={`${APP.LOGO_BLUE}`} className={classes.img} alt="logo" style={{maxWidth: '150px'}}/>
                        <h1 className={classes.title}>Đăng nhập</h1>
                    </Grid>
                    <TextField
                        label="Tài khoản"
                        id="standard-size-small"
                        // defaultValue="username@gmail.com"
                        size="small"
                        className={classes.textField}
                        onChange={handleChange("userName")}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                renderAuthUrl(event);
                                // write your functionality here
                            }
                        }}
                    />
                    <TextField
                        className={classes.textField}
                        label="Mật khẩu"
                        id="standard-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                renderAuthUrl(event);
                                // write your functionality here
                            }
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Wrapper>
                        <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{"aria-label": "primary checkbox"}}
                            className={classes.checkBox}
                        />
                        <span>Ghi nhớ tài khoản</span>
                    </Wrapper>
                    {props.dataInfo.loading && props.dataInfo.messageError ? (
                        <Alert severity="error">{props.dataInfo.messageError}</Alert>
                    ) : null}

                    <Wrapper>
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.button}
                            onClick={(e) => renderAuthUrl(e)}
                        >
                            Đăng Nhập
                        </Button>
                    </Wrapper>
                </Paper>
            </div>
        </div>
    );
}

// Lay du lieu ve
const mapStateToProps = createStructuredSelector({
    dataInfo: makeSelectProfile(),
    router: makeSelectRouter(),
});

// ban action len store
export function mapDispatchToProps(dispatch) {
    return {
        onSubmit: (params) => dispatch(loginRequest(params)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Login);
