import React from "react";
import { Breadcrumbs, Link } from "@material-ui/core";
// import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

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
});
function UIBreadcrumbs() {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
      <Link color="inherit">Admin</Link>
      <Link
        color="inherit"
        // href="/getting-started/installation/"
      >
        Học sinh
      </Link>
      <Link
        color="textPrimary"
        //   href="/components/breadcrumbs/"
        aria-current="page"
      >
        Thêm mới học sinh
      </Link>
    </Breadcrumbs>
  );
}

export default UIBreadcrumbs;
