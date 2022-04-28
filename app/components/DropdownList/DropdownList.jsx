/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { Children, useState } from "react";
import PropTypes from "prop-types";
import Wrapper from "./Wrapper";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import history from "utils/history";

import { makeStyles, useTheme } from "@material-ui/core/styles";
const sytleIcon = { color: "#888f99", fontSize: "1.3rem", margin: "auto" };
const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#233044",
    color: "#fff",
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
}));
function DropdownList(props) {
  const classes = styles();
  const { items, onClick } = props;
  const [state, setState] = useState({});
  const navigateView = (view) => {
    history.push(`/admin/${view}`);
  };
  const handleClick = (input) => {
    setState((prevState) => ({
      ...prevState,
      [input]: !state[`${input}`],
    }));
  };
  return (
    <Wrapper>
      {items.list.map((list, key) => {
        return (
          <List className={classes.root} key={list.id}>
            {list.items != null ? (
              <div>
                <ListItem button onClick={() => handleClick(list.name)}>
                  <ListItemIcon>{list.icon}</ListItemIcon>
                  <ListItemText primary={list.name} />
                  {state[`${list.name}`] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  // key={list.items.id}
                  component="li"
                  in={state[`${list.name}`]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List disablePadding>
                    {list.items.map((sitem) => {
                      return (
                        <ListItem
                          button
                          key={sitem.id}
                          onClick={() => navigateView(sitem.link)}
                          className={classes.nested}
                        >
                          <ListItemText primary={sitem.name} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            ) : (
              <ListItem button onClick={() => navigateView(list.link)}>
                <ListItemIcon>{list.icon}</ListItemIcon>
                <ListItemText primary={list.name} />
              </ListItem>
            )}
          </List>
        );
      })}
    </Wrapper>
  );
}
DropdownList.defaultProps = {
  // variant: 'contained',
  // disabled: false,
  // color: 'primary',
  // startIcon: null,
  // endIcon: null,
};
DropdownList.propTypes = {};

export default DropdownList;
