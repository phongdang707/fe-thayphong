import React, { memo, useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Loading from "components/Loading";
import CardItem from "components/Common/Card";

import reducer from "./reducer";
import saga from "./saga";
import { onReset, init, getDetailCourse } from "./action";
import { makeSelectData } from "./selectors";
import { Wrapper } from "./styled";

const useStyles = makeStyles((theme) => ({
  cardCenter: {
    // margin: "auto",
    // maxWidth: 450,
  },
}));

function StudentDashboard(props) {
  const classes = useStyles();
  useInjectReducer({ key: "studentCourse", reducer });
  useInjectSaga({ key: "studentCourse", saga });

  useEffect(() => {
    props.init();
    return () => {
      props.onReset();
    };
  }, []);

  const callback = (type, data) => {
    if (type == "CLICK_DETAIL") {
      props.getDetailCourse(data);
    }
  };

  return (
    <Wrapper>
      <Loading isLoading={props.dataStudent.loading}></Loading>
      Xin chào
      <Grid container spacing={3}>
        {props.dataStudent.course.map((item, index) => {
          return (
            <Grid
              key={index}
              item
              xs={12}
              md={4}
              className={classes.cardCenter}
            >
              <CardItem
                content={item.name_course}
                banner={item.banner ? item.banner : ""}
                des={item.des}
                id={item._id}
                callback={callback}
              ></CardItem>
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  dataStudent: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onReset: (params) => dispatch(onReset(params)),
    init: (params) => dispatch(init(params)),
    getDetailCourse: (params) => dispatch(getDetailCourse(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(StudentDashboard);
