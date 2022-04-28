import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { makeSelectDataConfirmPass, makeSelectProfile } from "./selector";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Modal from "components/Common/ModalCallback";

import { connect } from "react-redux";
import { compose } from "redux";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";

import reducer from "./reducer";
import saga from "./saga";

import { onChange, updatePassword } from "./action";
const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  textFlexEnd: {
    display: "flex",
    justifyContent: "flex-start",
    paddingRight: "5px",
    alignItems: "center",
  },
  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 0",
  },
  header: {
    padding: "20px 0",
    justifyContent: "center",
    display: "flex",
  },
}));

const key = "student_profile";

function Profile(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
    openModal: false,
  });
  const { profile } = props.dataInfo;
  const { address, fullName, school, grade } = profile;
  const { onChange, dataChangePass } = props;
  const { disableUpdatePassword } = dataChangePass;

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const callback = (type, data) => {
    switch (type) {
      case "CANCEL":
        setValues({ ...values, openModal: !values.openModal });
        break;
      case "SUBMIT":
        setValues({ ...values, openModal: !values.openModal });
        props.updatePassword();
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom className={classes.header}>
        Thông tin cá nhân
      </Typography>
      <Grid xs={12} sm={8} container spacing={0} style={{ margin: "auto" }}>
        <Grid item xs={4} className={classes.textFlexEnd}>
          <Typography>Họ và tên:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Input disabled value={fullName} fullWidth />
        </Grid>
        <Grid item xs={4} className={classes.textFlexEnd}>
          <Typography>Địa chỉ:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Input disabled value={address} fullWidth />
        </Grid>
        <Grid item xs={4} className={classes.textFlexEnd}>
          <Typography>Trường:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Input disabled value={school} fullWidth />
        </Grid>
        <Grid item xs={4} className={classes.textFlexEnd}>
          <Typography>Lớp:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Input disabled value={grade} fullWidth />
        </Grid>
        <Grid item xs={12} className={classes.flexEnd}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon></EditIcon>}
            onClick={() =>
              setValues({ ...values, openModal: !values.openModal })
            }
          >
            Thay đổi mật khẩu
          </Button>
        </Grid>
      </Grid>
      <Modal
        header="Thay đổi mật khẩu"
        contentCancel="Thoát"
        contentSubmit="Xác nhận"
        openModal={values.openModal}
        buttonPositiveDisable={disableUpdatePassword}
        body={
          <>
            <FormControl>
              <Grid item xs={12}>
                <Input
                  label="Mật khẩu *"
                  type={values.showPassword ? "text" : "password"}
                  fullWidth
                  value={props.dataChangePass.password.value || ""}
                  error={props.dataChangePass.password.error}
                  helperText="123213"
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
              <Grid item xs={12}>
                <Input
                  label="Xác nhận mật khẩu *"
                  type={values.showPassword ? "text" : "password"}
                  value={props.dataChangePass.confirmPassword.value || ""}
                  fullWidth
                  error={props.dataChangePass.confirmPassword.error}
                  helperText={
                    props.dataChangePass.confirmPassword.listErros.length > 0
                      ? props.dataChangePass.confirmPassword.listErros[0]
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
              </Grid>
            </FormControl>
          </>
        }
        callback={callback}
      ></Modal>
    </div>
  );
}

Profile.propTypes = {
  window: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dataInfo: makeSelectProfile(),
  dataChangePass: makeSelectDataConfirmPass(),
});
export function mapDispatchToProps(dispatch) {
  return {
    // onSubmit: (params) => dispatch(addExamRequest(params)),
    // onChange: (params) => dispatch(onChange(params)),
    onChange: (params) => dispatch(onChange(params)),
    updatePassword: (params) => dispatch(updatePassword(params)),
    // onGetCurrentAction: (params) => dispatch(getCurrentAction(params)),
    // onChangeActiveStep: (params) => dispatch(changeActiveStep(params)),
    // checkDataBeforeNextStep: (params) =>
    //   dispatch(checkDataBeforeNextStep(params)),
    // changeStateCheckData: (params) => dispatch(changeStateCheckData(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(Profile);
