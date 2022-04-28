import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import APP from "../../../appConfig";
import routes from "./routes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));
function ResponsiveDrawer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main>Profile</main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
