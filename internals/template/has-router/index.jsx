import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import APP from "../../appConfig";
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

  return (
    <div className={classes.root}>
      <main>{showContentMain()}</main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
