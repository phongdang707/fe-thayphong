import React, {memo, useEffect, useState} from "react";
// import Button from "components/Common/Button";
import Table from "components/Common/Table";
import ConfirmDialog from "components/Common/ConfirmDialog";
import {Breadcrumbs, Button, Divider, Link, Paper, Tab, Tabs, Typography,} from "@material-ui/core";
import {Helmet} from "react-helmet";
import {useInjectReducer} from "utils/injectReducer";
import {useInjectSaga} from "utils/injectSaga";
import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import Loading from "components/Loading";
import {useToasts} from "react-toast-notifications";
import reducer from "./reducer";
import saga from "./saga";
import {
    downloadFile,
    onChange,
    onCloseDialog,
    onOpenDialog,
    reset,
    viewCourseChangePage,
    viewCourseChangeRow,
    viewCourseChooseItem,
    viewCourseDeleteItem,
    viewCourseRequest,
    viewCourseSearchText,
    viewCourseSelectRow
} from "./action";
import {makeSelectData} from "./selectors";
import {makeStyles} from "@material-ui/core/styles";
import {Wrapper} from "./styled";

const useStyles = makeStyles({
    heading: {
        fontWeight: "600",
    },
    hr: {
        margin: "24px 0",
    },
    breadCrumbs: {
        fontSize: "13px",
    },
    paper: {
        padding: "20px",
    },
});

const key = "studentListing";

function ViewCourse(props) {
    const classes = useStyles();
    useInjectReducer({key, reducer});
    useInjectSaga({key, saga});
    const {addToast} = useToasts();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        props.onGetData();
    }, [
        props.dataTable.grade,
        props.dataTable.page,
        props.dataTable.rowsPerPage,
        props.dataTable.searchText,
        flag
    ]);


    useEffect(() => {
        if (props.dataTable.isSucess === true) {
            addToast(props.dataTable.messageToast.mess, {
                appearance: props.dataTable.messageToast.type,
                autoDismiss: true,
            });
            setFlag(!flag)
        }
        return () => {
            props.onReset();
        };
    }, [props.dataTable.isSucess]);

    return (
        <Wrapper>
            <Loading isLoading={props.dataTable.loading}/>
            <ConfirmDialog
                isOpenDialog={props.dataTable.openDialogConfirm}
                onCloseDialog={props.onCloseDialog}
                onPositiveChoice={props.onDeleteItems}
                title="Xóa học sinh"
                content={`Xác nhận xóa ${props.dataTable.selected.length} dòng`}
            />
            <Helmet defaultTitle="Học sinh">
                <meta name="description" content="REACT"/>
            </Helmet>
            <Typography variant="h6" className={classes.heading}>
                Quản lý học sinh
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
                <Link
                    color="inherit"
                >
                    Admin
                </Link>
                <Link
                    color="textPrimary" aria-current="page"
                >
                    Học sinh
                </Link>
            </Breadcrumbs>
            <Divider className={classes.hr}></Divider>
            <Button onClick={() => {
                // console.log("click")
                return props.downloadFile()
            }}>Tải về</Button>

            <Paper elevation={0} className={classes.paper}>
                <Tabs
                    value={props.dataTable.gradeTab}
                    onChange={(event, newValue) => {
                        props.onChange(newValue);
                    }}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="Khối 10"/>
                    <Tab label="Khối 11"/>
                    <Tab label="Khối 12"/>
                </Tabs>
                <Table
                    rows={props.dataTable.rows || []}
                    headCells={props.dataTable.headCells}
                    passPage={props.dataTable.page}
                    passRowsPerPage={props.dataTable.rowsPerPage}
                    itemsData={props.onChooseItemsData}
                    itemsSelected={props.dataTable.selected}
                    deleteItems={props.onOpenDialog}
                    totalItems={props.dataTable.totalItems}
                    tableName={props.dataTable.tableName}
                    onChangePage={props.onChangePage}
                    onChangeRowsPerPage={props.onChangeRowsPerPage}
                    onChangeSearchText={(event) => {
                        const {value} = event.target;
                        props.onChangeSearchText(value);
                    }}
                    orderBy='create_at'
                    showEditButton={true}
                    selectEdit={props.onSelectRow}
                />
            </Paper>
        </Wrapper>
    );
}

const mapStateToProps = createStructuredSelector({
    dataTable: makeSelectData(),
});

export function mapDispatchToProps(dispatch) {
    return {
        onGetData: (params) => dispatch(viewCourseRequest(params)),
        onChangePage: (params) => dispatch(viewCourseChangePage(params)),
        onChangeRowsPerPage: (params) => dispatch(viewCourseChangeRow(params)),
        onChooseItemsData: (params) => dispatch(viewCourseChooseItem(params)),
        onDeleteItems: (params) => dispatch(viewCourseDeleteItem(params)),
        onChangeSearchText: (params) => dispatch(viewCourseSearchText(params)),
        onSelectRow: (params) => dispatch(viewCourseSelectRow(params)),
        onReset: (params) => dispatch(reset(params)),
        onCloseDialog: (params) => dispatch(onCloseDialog(params)),
        onOpenDialog: (params) => dispatch(onOpenDialog(params)),
        onChange: (params) => dispatch(onChange(params)),
        downloadFile: (params) => dispatch(downloadFile(params)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(ViewCourse);
