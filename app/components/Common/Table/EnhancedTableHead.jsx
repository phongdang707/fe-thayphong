import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import _ from "lodash";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  padding20: {
    padding: "16px",
  },
}));

function EnhancedTableHead(props) {
  // const classes = useToolbarStyles();

  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    selected,
    rows,
    showCheckbox,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const check = () => {
    const newSelecteds = rows.map((n) => n._id);
    return _.union(selected, newSelecteds).length === numSelected;
  };

  return (
    <TableHead>
      <TableRow>
        {showCheckbox ? (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < props.totalItems}
              checked={rowCount > 0 && check()}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
              color="primary"
            />
          </TableCell>
        ) : null}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            //align={headCell.numeric ? "right" : "left"}
            align="left"
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.defaultValue ? order : false}
            className={!showCheckbox?classes.padding20:null}
          >
            <TableSortLabel
              active={orderBy === headCell.defaultValue}
              direction={orderBy === headCell.defaultValue ? order : "asc"}
              onClick={createSortHandler(headCell.defaultValue)}
            >
              {headCell.label}
              {orderBy === headCell.defaultValue ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {props.showEditButton ? <TableCell /> : null}
        {props.showDetailButton ? <TableCell /> : null}
        {props.showDeleteButton ? <TableCell /> : null}
        {props.showRestoreButton ? <TableCell /> : null}
      </TableRow>
    </TableHead>
  );
}
export default EnhancedTableHead;
