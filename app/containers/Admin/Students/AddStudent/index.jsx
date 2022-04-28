import React, { memo, useEffect, useState } from "react";
import Input from "components/Common/Input";
import {
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "components/Common/Button";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { createStructuredSelector } from "reselect";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import Selector from "components/Common/UISelector";
import Breadcrumbs from "components/Common/Breadcrumbs";
import Loading from "components/Loading";
import { useToasts } from "react-toast-notifications";
import history from "utils/history";
import queryString from "query-string";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "components/Common/ModalCallback";

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
import { WrapperButton } from "./styled";
import { makeSelectFormAddStudent } from "./selectors";

const useStyles = makeStyles({
  heading: {
    fontWeight: "600",
  },
  hr: {
    marginTop: "24px",
  },
  breadCrumbs: {
    fontSize: "13px",
  },
  paper: {
    marginTop: "24px",
    padding: "20px",
  },
  input: {
    // padding: "1rem 0",
  },
  selectDrop: {
    minWidth: "100%",
  },
});
const key = "student";

function AddStudent(props) {
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
  } = main;
  const classes = useStyles();
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

  const submitForm = () => {
    if (isUpdate === true) {
      updateInfo();
    } else {
      onSubmit();
    }
  };

  const idStudent = queryString.parse(location.search);
  useEffect(() => {
    if (isSucess === true) {
      addToast("Thêm học sinh thành công", {
        appearance: "success",
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
  }, [isSucess]);

  useEffect(() => {
    init(idStudent);

    return () => {
      props.onReset();
    };
  }, []);

  const callback = (type, data) => {
    switch (type) {
      case "CANCEL":
        setValues({ ...values, openModal: !values.openModal });
        break;
      case "SUBMIT":
        setValues({ ...values, openModal: !values.openModal });
        updatePassword();
        break;
      default:
        break;
    }
  };
  return (
    <>
      <FormControl>
        <Loading isLoading={isLoading}></Loading>
        <Typography variant="h6" className={classes.heading}>
          {label}
        </Typography>
        <Breadcrumbs></Breadcrumbs>
        <Divider className={classes.hr}></Divider>
        {isUpdate ? (
          <Grid
            container
            spacing={3}
            alignItems="flex-end"
            style={{ marginTop: "0px" }}
          >
            <Grid item xs={12}>
              <Button
                content="Cấp lại mật khẩu"
                startIcon={<EditIcon></EditIcon>}
                onClick={() =>
                  setValues({ ...values, openModal: !values.openModal })
                }
              />
            </Grid>
          </Grid>
        ) : null}
        <Paper elevation={1} className={classes.paper}>
          <Typography variant="h6">{label}</Typography>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} md={6}>
              <Input
                label="Họ tên học sinh *"
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
              ></Input>
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="Tên đăng nhập *"
                fullWidth
                value={name.value}
                error={name.error}
                helperText={
                  name.listErros.length > 0 ? name.listErros[0] : null
                }
                onChange={(event) => {
                  const { value } = event.target;
                  onChange({ name: value });
                }}
              ></Input>
            </Grid>

            {isUpdate ? null : (
              <>
                {" "}
                <Grid item xs={12} md={6}>
                  <Input
                    label="Mật khẩu *"
                    type={values.showPassword ? "text" : "password"}
                    fullWidth
                    value={password.value}
                    error={password.error}
                    helperText={
                      password.listErros.length > 0
                        ? password.listErros[0]
                        : null
                    }
                    onChange={(event) => {
                      const { value } = event.target;
                      onChange({ password: value });
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  ></Input>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Xác nhận mật khẩu *"
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
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  ></Input>
                </Grid>{" "}
              </>
            )}

            <Grid item xs={12} md={6}>
              <Input
                label="Số điện thoại cá nhân"
                fullWidth
                value={phoneNumberStudent.value}
                onChange={(event) => {
                  const { value } = event.target;
                  onChange({ phoneNumberStudent: value });
                }}
              ></Input>
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="Số điện thoại gia đình *"
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
              ></Input>
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Địa chỉ"
                fullWidth
                onChange={(event) => {
                  const { value } = event.target;
                  onChange({ address: value });
                }}
                value={address.value}
              ></Input>
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Trường"
                fullWidth
                value={school.value}
                onChange={(event) => {
                  const { value } = event.target;
                  onChange({ school: value });
                }}
              ></Input>
            </Grid>
            <Grid item xs={12} md={4}>
              <Selector
                className={classes.selectDrop}
                onChange={(event) => {
                  props.onChange({ grade: event });
                }}
                valueItem={[
                  { lable: "10", value: "10" },
                  { lable: "11", value: "11" },
                  { lable: "12", value: "12" },
                ]}
                label="Khối"
                value={grade.value}
              ></Selector>
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                label="Lớp"
                fullWidth
                value={classRoom.value}
                onChange={(event) => {
                  const { value } = event.target;
                  onChange({ classRoom: value });
                }}
              ></Input>
            </Grid>
          </Grid>
          <WrapperButton>
            <Button
              content={isUpdate ? "Cập nhật thông tin" : "Thêm học sinh"}
              startIcon={<AddIcon></AddIcon>}
              onClick={submitForm}
              disabled={isDisable}
            />
          </WrapperButton>
        </Paper>
      </FormControl>
      <Modal
        header="Cấp lại mật khẩu"
        contentCancel="Thoát"
        contentSubmit="Xác nhận"
        openModal={values.openModal}
        body={
          <>
            <Grid item xs={12}>
              <Input
                label="Mật khẩu *"
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
              ></Input>
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Xác nhận mật khẩu *"
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
              ></Input>
            </Grid>
          </>
        }
        callback={callback}
      ></Modal>
    </>
  );
}

// Lay du lieu ve
const mapStateToProps = createStructuredSelector({
  // dataInfo: makeSelectProfile(),
  // router: makeSelectRouter(),
  main: makeSelectFormAddStudent(),
});
// ban action len store
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
export default compose(withConnect, memo)(AddStudent);
