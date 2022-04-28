import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import School from "@material-ui/icons/School";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import history from "utils/history";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import APP from "../../appConfig";
import routes from "./routes";
import { AccountCircle, ExpandLess, ExpandMore } from "@material-ui/icons";
import DropdownList from "components/DropdownList/DropdownList.jsx";
import { Menu, MenuItem } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";

import { LOCATION_ROOT } from "../../config/common";

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
    background: "#233044",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: "60px",
  },
  img: {
    width: "100%",
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
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

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
  const sytleIcon = { color: "#888f99", fontSize: "1.3rem", margin: "auto" };

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

  const style = {
    account: {
      position: "absolute",
      bottom: "0",
    },
  };
  const dummyCategories = {
    list: [
      {
        id: 1,
        name: "Xem tổng quan",
        icon: <DashboardIcon style={sytleIcon} />,
        items: [
          {
            id: 1,
            name: "Thống kê bài thi",
            link: "dashboard/chart",
          },
          {
            id: 2,
            name: "Dữ liệu đã xóa",
            link: "dashboard/data",
          },
        ],
      },
      {
        id: 2,
        name: "Khóa học",
        icon: <MenuBookIcon style={sytleIcon} />,
        items: [
          {
            id: 1,
            name: "Danh sách khóa học",
            link: "courses",
          },
          {
            id: 2,
            name: "Thêm khóa học",
            link: "courses/addCourse",
          },
        ],
      },
      {
        id: 3,
        name: "Học sinh",
        icon: <PermContactCalendarIcon style={sytleIcon} />,
        items: [
          {
            id: 2,
            name: "Danh sách học sinh",
            link: "student",
          },
          {
            id: 1,
            name: "Thêm học sinh",
            link: "student/addStudent",
          },
          {
            id: 3,
            name: "Yêu cầu đăng ký",
            link: "student/confirm-student",
          },
        ],
      },
      {
        id: 4,
        name: "Thư viện đề thi",
        icon: <School style={sytleIcon} />,
        items: [
          {
            id: 2,
            name: "Danh sách đề thi",
            link: "exam",
          },
          {
            id: 1,
            name: "Thêm đề thi",
            link: "exam/addExam",
          },
        ],
      },
    ],
  };
  const onClickMenu = (text) => {
    props.switchMenu(MAP_OPTION[text].key);
    history.push(MAP_OPTION[text].url);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = `${window.location.origin}/login`;
  };

  const drawer = (
    <>
      <div className={classes.toolbar}>
        <img src={`${APP.LOGO}`} className={classes.img} alt="logo" />
      </div>
      <DropdownList items={dummyCategories} />
    </>
  );

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const container =
    props.window !== undefined ? () => props.window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Hidden smUp implementation="css">
        <AppBar position="fixed" className={classes.appBar} color="inherit">
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
      <Hidden xsDown implementation="css">
        <AppBar position="fixed" className={classes.appBar} color="inherit">
          <Toolbar className={classes.toolbar}>
            <div style={{ position: "absolute", right: "30px" }}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openMenu}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </div>
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

export default ResponsiveDrawer;
