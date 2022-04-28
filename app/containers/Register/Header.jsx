import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import BodyContainer from "./BodyContainer";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    header: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "8px",
        borderTop: "10px solid rgb(39, 120, 24)",
        boxShadow: " 0 2px 0 rgb(0 0 0 / 20%)",
        marginBottom: "10px",
        padding: theme.spacing(3)
    },
    sub: {
        padding: "10px 0"
    },
    img: {
        width: "100%",
        borderRadius: "8px",
        marginBottom: "10px"
    }
}));

const HeaderContainer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Box>
                        <img
                            className={classes.img}
                            alt=""
                            src="https://lh4.googleusercontent.com/z6SmrQhnsytqOtpIfO3ZEGsHiKtSbRWucYz5_CNszHJdvXiVc0vs7lLNFt4EDKykTg0_K27uRnZ-zjTFbKxo_IRKWOSvrDw9oIyzwOtD23jzijUOsMfkFxF8t3pefSX0fg=w1200"
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} className={classes.header}>
                    <Box>
                        <Typography variant="h5">
                            Đăng ký tài khoản
                        </Typography>
                        <Typography className={classes.sub} variant="subtitle1">
                            Nhập đầy đủ thông tin để đăng ký tài khoản.
                        </Typography>
                        <Typography variant="subtitle1" color="error">
                            *Bắt buộc
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <BodyContainer/>
                </Grid>
            </Grid>
        </div>
    );
};

export default HeaderContainer;
