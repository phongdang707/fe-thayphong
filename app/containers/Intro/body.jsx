import React from "react";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    tag: {
      margin: "20px 0px",
    },
  })
);

const style = {
  background: {
    background:
      "url(https://s.tracnghiem.net/assets/images/banner/banner.png) no-repeat top center",
    minHeight: "360px",
    backgroundSize: "cover",
    textAlign: "center",
    paddingTop: "70px",
    width: "100%",
    color: "white",
    paddingBottom: "25px",
  },
  shadowBox: { textAlign: "center" },
  textCenter: { textAlign: "center" },
  drawLine: {
    position: "relative",
  },
  imgDrawLine: {
    position: "absolute",
    top: "145px",
  },
  container: { position: "relative" },
  margin20: {
    margin: "20px 0px",
  },
};
function Body() {
  const classes = useStyles();
  return (
    <>
      <div style={style.background}>
        <h1>TRẮC NGHIỆM ONLINE</h1>
        <span>ĐA DẠNG - THÔNG MINH - CHÍNH XÁC</span>
        <Grid container spacing={0}>
          <Grid item xs={12} md={4} className={classes.tag}>
            <div class="shadow-box">
              <div class="img">
                <img
                  src="https://s.tracnghiem.net/assets/images/home/feature1.jpg"
                  alt="Đề thi học kỳ"
                />
              </div>
              <h3>Đề thi học kỳ</h3>
              <p>
                Ngân hàng câu hỏi đầy đủ được trộn tạo đề theo cấu trúc phân
                loại giúp các em dễ dàng ôn tập online đề thi giữa học kỳ, thi
                học kỳ theo các chủ đề đã học.
              </p>
            </div>
          </Grid>
          <Grid item xs={12} md={4} className={classes.tag}>
            <div class="shadow-box">
              <div class="img">
                <img
                  src="https://s.tracnghiem.net/assets/images/home/feature2.jpg"
                  alt="Đề thi THPT QG"
                />
              </div>
              <h3>Đề thi THPT QG</h3>
              <p>
                Tổng hợp đề thi trắc nghiệm online THPT QG kèm đáp án và lời
                giải chi tiết.
              </p>
            </div>
          </Grid>
          <Grid item xs={12} md={4} className={classes.tag}>
            <div class="shadow-box">
              <div class="img">
                <img
                  src="https://s.tracnghiem.net/assets/images/home/feature3.jpg"
                  alt="Đề kiểm tra"
                />
              </div>
              <h3>Đề kiểm tra</h3>
              <p>
                Hệ thống bài kiểm tra 1 tiết, kiểm tra 15 phút được thiết kế
                theo hình thức trắc nghiệm online giúp học sinh luyện tập và
                chấm điểm trực tuyến.
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
      <Container maxWidth="lg">
        <h1 style={style.textCenter}>TRẮC NGHIỆM THÔNG MINH</h1>
        <Grid container>
          <Grid sm={4}>
            <div class="green-rect">
              <img
                src="https://s.tracnghiem.net/assets/images/home/smart1.png"
                alt="Đa dạng nội dung"
              />
            </div>
            <h3 class="title25Bold">Đa dạng nội dung</h3>
            <p class="title25Bold">
              Cung cấp đa dạng nội dung các câu hỏi trắc nghiệm thuộc nhiều lĩnh
              vực khác nhau
            </p>
          </Grid>
          <Grid sm={4}>
            <div class="green-rect">
              <img
                src="https://s.tracnghiem.net/assets/images/home/smart2.png"
                alt="Ma trận câu hỏi"
              />
            </div>
            <h3 class="title25Bold">Ma trận câu hỏi</h3>
            <p class="title25Bold">
              Hệ thống sẽ dựa vào ma trận câu hỏi phong phú để tự tổng hợp thành
              đề trắc nghiệm
            </p>
          </Grid>
          <Grid sm={4}>
            <div class="green-rect">
              <img
                src="https://s.tracnghiem.net/assets/images/home/smart3.png"
                alt="Đáp án chi tiết"
              />
            </div>
            <h3 class="title25Bold">Đáp án chi tiết</h3>
            <p class="title25Bold">
              Sau khi hoàn thành bài kiểm tra trắc nghiệm hệ thống sẽ thông báo
              số điểm đạt được kèm lời giải chi tiết
            </p>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Body;
