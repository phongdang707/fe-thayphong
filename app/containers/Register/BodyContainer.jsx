import React, { memo, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import { useToasts } from "react-toast-notifications";
import { createStructuredSelector } from "reselect";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import Button from "@material-ui/core/Button";
import queryString from "query-string";
import TextField from "@material-ui/core/TextField";
import {
    FormControlLabel,
    IconButton,
    InputAdornment,
    RadioGroup,
    FormControl,
    Radio,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { compose } from "redux";
import { connect } from "react-redux";

import reducer from "./reducer";
import saga from "./saga";
import {
    onChange,
    onReset,
    onSubmit,
    init,
    updatePassword,
    updateInfo,
} from "./action";
import { makeSelectFormAddStudent } from "./selectors";
import AddIcon from "@material-ui/icons/Add";
import { WrapperButton } from "../Admin/Students/AddStudent/styled";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
const key = "studentRegister";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
    },
    container: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: " 0 2px 0 rgb(0 0 0 / 20%)",
        marginBottom: "20px",
        padding: theme.spacing(3),
        // border: "2px solid red",
    },
    star: {
        color: "red",
    },
    input: {
        minWidth: "100%",
    },
    subtitle: {
        paddingBottom: "20px",
    },
}));

const BodyContainer = (props) => {
    const classes = useStyles();
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const { addToast } = useToasts();

    const { onChange, onSubmit, main, init, updatePassword, updateInfo } = props;
    const {
        fullName,
        name,
        password,
        confirmPassword,
        school,
        grade,
        classRoom,
        phoneNumberStudent,
        phoneNumberFamily,
        address,
        isLoading,
        isSucess,
        isDisable,
        isUpdate,
        label,
        noti
    } = main;

    const { open,
        type,
        content } = noti

    const [values, setValues] = useState({
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
        showPassword: false,
        openModal: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

   

    const idStudent = queryString.parse(location.search);
    useEffect(() => {
        if (isSucess === true) {
            addToast(content, {
                appearance: type,
                autoDismiss: true,
            });
        }


        // if (idStudent) {
        //   init(idStudent);
        // } else {
        //   init();
        // }
        // return () => {
        //   props.onReset();
        // };
    }, [open]);

    useEffect(() => {
        init(idStudent);

        return () => {
            props.onReset();
        };
    }, []);


    return (
        <>
            {/* <Snackbar open={open} autoHideDuration={1000} >
                <Alert severity={type}>
                    {content}
                </Alert>
            </Snackbar> */}
            <List className={classes.root}>
                <ListItem className={classes.container}>
                    <Box>
                        <Typography className={classes.subtitle} variant="subtitle1">
                            Họ và tên <span className={classes.star}>*</span>
                        </Typography>
                        {/* <TextField
              className={classes.input}
              inputProps={{ "aria-label": "description" }}
            /> */}

                        <TextField
                            className={classes.input}
                            placeholder="Câu trả lời của bạn"
                            inputProps={{ "aria-label": "description" }}
                            fullWidth
                            onChange={(event) => {
                                const { value } = event.target;
                                onChange({ fullName: value });
                            }}
                            value={fullName.value}
                            error={fullName.error}
                            helperText={
                                fullName.listErros.length > 0 ? fullName.listErros[0] : null
                            }
                        ></TextField>
                    </Box>
                </ListItem>

                <ListItem className={classes.container}>
                    <Box>
                        <Typography className={classes.subtitle} variant="subtitle1">
                            Tên đăng nhập <span className={classes.star}>*</span>
                        </Typography>
                        <form>
                            {/* <TextField
              className={classes.input}
              placeholder="Câu trả lời của bạn"
              inputProps={{ "aria-label": "description" }}
            /> */}

                            <TextField
                                className={classes.input}
                                placeholder="Câu trả lời của bạn"
                                inputProps={{ "aria-label": "description" }}
                                fullWidth
                                value={name.value}
                                error={name.error}
                                helperText={name.listErros.length > 0 ? name.listErros[0] : null}
                                onChange={(event) => {
                                    const { value } = event.target;
                                    onChange({ name: value });
                                }}
                            ></TextField>
                        </form>
                    </Box>
                </ListItem>

                <ListItem className={classes.container}>
                    <Box>
                        <Typography className={classes.subtitle} variant="subtitle1">
                            Mật khẩu <span className={classes.star}>*</span>
                        </Typography>
                        <form>
                            {/* <TextField
           
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            /> */}
                            <TextField
                                className={classes.input}
                                placeholder="Câu trả lời của bạn"
                                inputProps={{ "aria-label": "description" }}
                                type={values.showPassword ? "text" : "password"}
                                fullWidth
                                value={password.value}
                                error={password.error}
                                helperText={
                                    password.listErros.length > 0 ? password.listErros[0] : null
                                }
                                onChange={(event) => {
                                    const { value } = event.target;
                                    onChange({ password: value });
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                        </form>
                    </Box>
                </ListItem>
                <ListItem className={classes.container}>
                    <Box>
                        <Typography className={classes.subtitle} variant="subtitle1">
                            Xác nhận mật khẩu <span className={classes.star}>*</span>
                        </Typography>
                        <form>
                            {/* <TextField
              className={classes.input}
              placeholder="Câu trả lời của bạn"
              inputProps={{ "aria-label": "description" }}
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              InputProps={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            /> */}
                            <TextField
                                className={classes.input}
                                placeholder="Câu trả lời của bạn"
                                inputProps={{ "aria-label": "description" }}
                                type={values.showPassword ? "text" : "password"}
                                value={confirmPassword.value}
                                fullWidth
                                error={confirmPassword.error}
                                helperText={
                                    confirmPassword.listErros.length > 0
                                        ? confirmPassword.listErros[0]
                                        : null
                                }
                                onChange={(event) => {
                                    const { value } = event.target;
                                    onChange({ confirmPassword: value });
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                        </form>
                    </Box>
                </ListItem>

                <ListItem className={classes.container}>
                    <Box>
                        <Typography className={classes.subtitle} variant="subtitle1">
                            Số điện thoại cá nhân
                    </Typography>
                        <form>
                            {/* <TextField
              className={classes.input}
              placeholder="Câu trả lời của bạn"
              inputProps={{ "aria-label": "description" }}
            /> */}
                            <TextField
                                className={classes.input}
                                placeholder="Câu trả lời của bạn"
                                inputProps={{ "aria-label": "description" }}
                                fullWidth
                                value={phoneNumberStudent.value}
                                onChange={(event) => {
                                    const { value } = event.target;
                                    onChange({ phoneNumberStudent: value });
                                }}
                            ></TextField>
                        </form>
                    </Box>
                </ListItem>
                <ListItem className={classes.container}>
                    <Box>
                        <Typography className={classes.subtitle} variant="subtitle1">
                            Số điện thoại gia đình <span className={classes.star}>*</span>
                        </Typography>
                        <form>
                            <TextField
                                className={classes.input}
                                placeholder="Câu trả lời của bạn"
                                inputProps={{ "aria-label": "description" }}
                                fullWidth
                                value={phoneNumberFamily.value}
                                onChange={(event) => {
                                    const { value } = event.target;
                                    onChange({ phoneNumberFamily: value });
                                }}
                                error={phoneNumberFamily.error}
                                helperText={
                                    phoneNumberFamily.listErros.length > 0
                                        ? phoneNumberFamily.listErros[0]
                                        : null
                                }
                            ></TextField>
                            {/* <TextField
              className={classes.input}
              placeholder="Câu trả lời của bạn"
              inputProps={{ "aria-label": "description" }}
            /> */}
                        </form>
                    </Box>
                </ListItem>

                <ListItem className={classes.container}>
                    <Box>
                        <Typography className={classes.subtitle} variant="subtitle1">
                            Địa chỉ
                    </Typography>
                        <form>
                            {/* <TextField
              className={classes.input}
              placeholder="Câu trả lời của bạn"
              inputProps={{ "aria-label": "description" }}
            /> */}
                            <TextField
                                className={classes.input}
                                placeholder="Câu trả lời của bạn"
                                inputProps={{ "aria-label": "description" }}
                                fullWidth
                                onChange={(event) => {
                                    const { value } = event.target;
                                    onChange({ address: value });
                                }}
                                value={address.value}
                            ></TextField>
                        </form>
                    </Box>
                </ListItem>
                <ListItem className={classes.container}>
                    <Box>
                        <Typography className={classes.subtitle} variant="subtitle1">
                            Trường
                    </Typography>
                        <form>
                            <TextField
                                className={classes.input}
                                placeholder="Câu trả lời của bạn"
                                inputProps={{ "aria-label": "description" }}
                                fullWidth
                                value={school.value}
                                onChange={(event) => {
                                    const { value } = event.target;
                                    onChange({ school: value });
                                }}
                            ></TextField>
                            {/* <TextField
              className={classes.input}
              placeholder="Câu trả lời của bạn"
              inputProps={{ "aria-label": "description" }}
            /> */}
                        </form>
                    </Box>
                </ListItem>
                <ListItem className={classes.container}>
                    <Box>
                        <Typography className={classes.subtitle} variant="subtitle1">
                            Khối <span className={classes.star}>*</span>
                        </Typography>

                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="grade"
                                name="grade"
                                value={grade.value}
                                onChange={(event) => {
                                    props.onChange({ grade: event.target.value });
                                }}
                            //   value={value}
                            //   onChange={handleChange}
                            >
                                <FormControlLabel value="10" control={<Radio  color="primary"  />} label="10" />
                                <FormControlLabel value="11" control={<Radio  color="primary" />} label="11" />
                                <FormControlLabel value="12" control={<Radio color="primary"  />} label="12" />
                                {/* <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="(Disabled option)"
              /> */}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </ListItem>
                <ListItem className={classes.container}>
                    <Box>
                        <Typography className={classes.subtitle} variant="subtitle1">
                            Lớp
                    </Typography>
                        <form>
                            {/* <TextField
              className={classes.input}
              placeholder="Câu trả lời của bạn"
              inputProps={{ "aria-label": "description" }}
            /> */}
                            <TextField
                                className={classes.input}
                                placeholder="Câu trả lời của bạn"
                                inputProps={{ "aria-label": "description" }}
                                fullWidth
                                value={classRoom.value}
                                onChange={(event) => {
                                    const { value } = event.target;
                                    onChange({ classRoom: value });
                                }}
                            ></TextField>
                        </form>
                    </Box>
                </ListItem>

                <Button variant="contained" color="primary" onClick={() => onSubmit()} disabled={isDisable}>
                    Gửi yêu cầu
            </Button>

            </List>
        </>
    );
};
const mapStateToProps = createStructuredSelector({
    // dataInfo: makeSelectProfile(),
    // router: makeSelectRouter(),
    main: makeSelectFormAddStudent(),
});

export function mapDispatchToProps(dispatch) {
    return {
        onChange: (params) => dispatch(onChange(params)),
        onSubmit: (params) => dispatch(onSubmit(params)),
        onReset: (params) => dispatch(onReset(params)),
        init: (params) => dispatch(init(params)),
        updatePassword: (params) => dispatch(updatePassword(params)),
        updateInfo: (params) => dispatch(updateInfo(params)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(BodyContainer);
