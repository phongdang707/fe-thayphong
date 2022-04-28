import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
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
import Edit from "@material-ui/icons/Edit";
import Assignment from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import Restore from "@material-ui/icons/Restore";
import FilterListIcon from "@material-ui/icons/FilterList";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import { stableSort, descendingComparator, getComparator } from "./utils";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  rootSmallScreen:{
    width:"max-content"
  },
  paper: {
    width: "100%",
    //marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 340,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  imagePrev: {
    height: 50,
    width: 100,
  },
  padding20: {
    padding: "16px",
  },
  tableRow: {
    "&$selected, &$selected:hover": {
      backgroundColor: "rgb(231, 237, 249)",
    },
  },
  tableCell: {
    "$selected &": {
      color: "rgb(231, 237, 249)",
    },
  },
  selected: {},
}));

function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState(props.orderBy);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    headCells,
    rows,
    tableName,
    deleteItems,
    totalItems,
    onChangeSearchText,
    deleteButton,
    showEditButton,
    showDetailButton,
    showDeleteButton,
    showRestoreButton,
    showCheckbox,
    showHeader,
    showFooter,
    disableEditButton,
    showSelectNumber,
    confirm
  } = props;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    const newSelecteds = rows.map((n) => n._id);
    if (event.target.checked) {
      props.itemsData(_.union(selected, newSelecteds));
      return;
    }
    props.itemsData(_.differenceBy(selected, newSelecteds));
  };
  useEffect(() => {
    setPage(props.passPage);
    setRowsPerPage(props.passRowsPerPage);
    setSelected(props.itemsSelected);
  }, [props.passPage, props.passRowsPerPage, props.itemsSelected]);

  const selectRow = (event, name) => {
    props.selectRow(name);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    props.itemsData(newSelected);
  };

  const handleClickEdit = (event, name) => {
    props.selectEdit(name);
  };

  const handleClickDetail = (event, name) => {
    props.selectDetail(name);
  };

  const handleChangePage = (event, newPage) => {
    props.onChangePage(newPage);
  };

  const handleClickRestore = (event, name) => {
    props.selectRestore({id:name,name:"restore"});
  };

  const handleClickRemove = (event, name) => {
    props.selectRemove({id:name,name:"remove"});
  };

  const handleChangeRowsPerPage = (event) => {
    props.onChangeRowsPerPage(parseInt(event.target.value, 10));
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={window.innerWidth>1024?classes.root:classes.rootSmallScreen}>
      <Paper className={classes.paper}>
        {showHeader ? (
          <EnhancedTableToolbar
            tableName={tableName}
            numSelected={selected.length}
            deleteItems={deleteItems}
            onChangeSearchText={onChangeSearchText}
            deleteButton={deleteButton}
            showSelectNumber={showSelectNumber}
            confirm={confirm}
          />
        ) : null}
        <TableContainer>
          <Grid item xs={12}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              //size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                selected={selected}
                order={order}
                orderBy={orderBy}
                totalItems={totalItems}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                rows={rows}
                headCells={headCells}
                showEditButton={showEditButton}
                showDeleteButton ={showDeleteButton}
                showRestoreButton ={showRestoreButton}
                showCheckbox={showCheckbox}
                showDetailButton={showDetailButton}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map(
                  (row, indexRow) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${indexRow}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        classes={{ selected: classes.selected }}
                        className={classes.tableRow}
                      >
                        {showCheckbox && (
                          <TableCell
                            padding="checkbox"
                            onClick={(event) => handleClick(event, row._id)}
                          >
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                        )}
                        {headCells.map((headCell, index) => (
                          <TableCell
                            onClick={(event) => selectRow(event, row._id)}
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            key={index}
                            className={!showCheckbox?classes.padding20:null}
                            // style={!showCheckbox && { padding: "16px" }}
                          >
                            {(() => {
                              switch (headCell.type) {
                                case "image":
                                  if (row[headCell.defaultValue]) {
                                    return (
                                      <img
                                        className={classes.imagePrev}
                                        src={row[headCell.defaultValue]}
                                      />
                                    );
                                  }
                                  return null;
                                case "number":
                                  return row[headCell.defaultValue].length;
                                case "autoIncreaseNumber":
                                  return indexRow +1;
                                case "date":
                                  let date = new Date(
                                    row[headCell.defaultValue]
                                  );
                                  return `${date.getHours()}:${date.getMinutes()} ngày ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                                case "customData":
                                  if(row[headCell.defaultValue]){
                                    return headCell.data.trueCase
                                  }
                                  else{
                                    return headCell.data.falseCase
                                  }
                                  return;
                                case "customScore":
                                  if(row[headCell.defaultValue] < 0){
                                    return "Chưa có kết quả"
                                  }
                                  else{
                                    return row[headCell.defaultValue]
                                  }
                                  return;
                                default:
                                  if (headCell.maxWord && row[headCell.defaultValue]) {
                                    if (
                                      row[headCell.defaultValue].length > headCell.maxWord
                                    ) {
                                      return `${row[
                                        headCell.defaultValue
                                      ].slice(0, headCell.maxWord)}...`;
                                    }
                                    return row[headCell.defaultValue].slice(
                                      0,
                                      headCell.maxWord
                                    );
                                  }
                                  return row[headCell.defaultValue];
                              }
                            })()}
                          </TableCell>
                        ))}
                        {showDetailButton ? (
                          <TableCell padding="checkbox">
                            <Tooltip title="Xem chi tiết">
                              <IconButton
                                onClick={(event) =>
                                  handleClickDetail(event, row._id)
                                }
                              >
                                <Assignment />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        ) : null}
                        {showRestoreButton ? (
                          <TableCell padding="checkbox">
                            <Tooltip title="Khôi phục dữ liệu">
                              <IconButton
                                onClick={(event) =>
                                  handleClickRestore(event, row._id)
                                }
                              >
                                <Restore />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        ) : null}
                        {showDeleteButton ? (
                          <TableCell padding="checkbox">
                            <Tooltip title="Xóa dữ liệu">
                              <IconButton
                                onClick={(event) =>
                                  handleClickRemove(event, row._id)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        ) : null}
                        {showEditButton ? (
                          <TableCell padding="checkbox">
                            {disableEditButton && row.status == false?(
                                <IconButton
                                  onClick={(event) => handleClickEdit(event, row._id)}
                                  disabled
                                  >
                                  <Edit/>
                                </IconButton>
                            ):(
                              <Tooltip title="Chỉnh sửa">
                                <IconButton
                                  onClick={(event) => handleClickEdit(event, row._id)}
                                  >
                                  <Edit/>
                                </IconButton>
                              </Tooltip>
                            )}

                          </TableCell>
                        ) : null}
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </Grid>
        </TableContainer>
        {showFooter ? (
          <TablePagination
            labelRowsPerPage="Số dòng"
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} trên tổng ${count}`
            }
          />
        ):null}
      </Paper>
    </div>
  );
}
EnhancedTable.defaultProps = {
  deleteButton: true,
  selectRow: () => {},
  itemsData: () => {},
  orderBy:'id',
  showEditButton:false,
  showDetailButton:false,
  itemsSelected:[],
  showCheckbox:true,
  showHeader:true,
  showFooter:true,
  disableEditButton:false,
  showSelectNumber:true,
  showDeleteButton:false,
  showRestoreButton:false
};
EnhancedTable.propTypes = {};
export default EnhancedTable;
