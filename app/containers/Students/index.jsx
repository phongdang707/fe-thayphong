import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import { Avatar, Button, ListItemAvatar, Popover } from "@material-ui/core";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import HomeIcon from "@material-ui/icons/Home";
import { compose } from "redux";
import { connect } from "react-redux";
import AssignmentIcon from "@material-ui/icons/Assignment";
import history from "utils/history";
import { createStructuredSelector } from "reselect";
import blue from "@material-ui/core/colors/blue";

import { makeSelectData } from "./selector";
import APP from "../../appConfig";
import routes from "./routes";
import { getProfile, init, switchMenu } from "./action";
import reducer from "./reducer";
import saga from "./saga";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    toolbar: theme.mixins.toolbar,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#f5f7f9",
    padding: "0 20px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: "60px",
  },
  img: {
    width: "60%",
    margin: "20px 0 ",
  },
  hover: {
    color: "#444",
    borderRadius: "5px",
    margin: "5px 0",
    transition: "0.3s",
    "&:hover": {
      background: "white",
      color: "#2392ec",
      cursor: "pointer",
      transition: "0.2s",
    },
  },
  active: {
    margin: "5px 0",
    borderRadius: "5px",
    background: "white",
    color: "#2392ec",
    cursor: "pointer",
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    textTransform: "uppercase",
  },
}));

function ResponsiveDrawer(props) {
  useInjectReducer({ key: "studentDashboard", reducer });
  useInjectSaga({ key: "studentDashboard", saga });
  const { dataStudentDashboard } = props;
  const { profile } = dataStudentDashboard;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const showContentMain = () => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ));
    }
    return <Switch>{result}</Switch>;
  };

  useEffect(() => {
    props.init();
  }, []);
  const style = {
    account: {
      position: "absolute",
      bottom: "0",
    },
  };
  const MAP_OPTION = {
    home: {
      key: "HOME",
      title: "Trang chủ",
      url: "/student",
      icon: <HomeIcon></HomeIcon>,
    },
    course: {
      key: "COURSE",
      title: "Khóa học",
      url: "/student/course",
      icon: <GolfCourseIcon></GolfCourseIcon>,
    },
    exam: {
      key: "EXAM",
      title: "Bài thi đã làm",
      url: "/student/exam",
      icon: <AssignmentIcon></AssignmentIcon>,
    },
    profile: {
      key: "PROFILE",
      title: "profile",
      url: "/student/profile",
      icon: <AssignmentIcon></AssignmentIcon>,
    },
  };
  const onClickMenu = (text) => {
    props.switchMenu(MAP_OPTION[text].key);
    history.push(MAP_OPTION[text].url);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = `${window.location.origin}/login`;
  };

  const option = ["home", "course", "exam"];
  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img src={`${APP.LOGO_HCN}`} className={classes.img} alt="logo" />
      </div>
      <Divider></Divider>
      <List>
        {option.map((text, index) => (
          <ListItem
            key={index}
            className={
              dataStudentDashboard.menuActive === MAP_OPTION[text].key
                ? classes.active
                : classes.hover
            }
            onClick={() => onClickMenu(text)}
          >
            <ListItemAvatar>{MAP_OPTION[text].icon}</ListItemAvatar>
            <ListItemText primary={MAP_OPTION[text].title} />
          </ListItem>
        ))}
      </List>
      <div style={style.account}>
        <Divider></Divider>
        <ListItem
          aria-describedby={id}
          variant="contained"
          color="primary"
          onClick={handleClick}
          // onClick={() => onClickMenu("profile")}
        >
          <ListItemAvatar>
            <Avatar className={classes.blue}>
              {`${profile.fullName}`.substring(0, 1)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={profile.fullName}
            secondary="Cài đặt tài khoản"
          />
        </ListItem>
      </div>
      {/* <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Popover
      </Button> */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <ListItem aria-describedby={id} variant="contained" color="primary">
          <ListItemAvatar>
            <Avatar className={classes.blue}>
              {`${profile.fullName}`.substring(0, 1)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={profile.fullName}
            secondary="Xem trang cá nhân"
            onClick={() => onClickMenu("profile")}
          />
        </ListItem>
        <ListItem onClick={handleLogout}>
          <ListItemAvatar>
            <ExitToAppIcon></ExitToAppIcon>
          </ListItemAvatar>
          <ListItemText primary="Đăng xuất" />
        </ListItem>
      </Popover>
    </div>
  );

  const container =
    props.window !== undefined ? () => props.window().document.body : undefined;

  useEffect(() => {
    props.init();
  }, []);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Hidden smUp implementation="css">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Hidden>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{showContentMain()}</main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  // window: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dataStudentDashboard: makeSelectData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    init: (params) => dispatch(init(params)),
    switchMenu: (params) => dispatch(switchMenu(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(ResponsiveDrawer);
