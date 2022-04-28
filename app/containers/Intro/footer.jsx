import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";

import logo from "../../assets/images/ngan-trang1.png";

const style = {
  footer: {
    background: "#3a4bcd",
    color: "white",
  },
  img: {
    display: "flex",
    margin: "auto",
  },
};
const P = styled.p`
  border-top: 1px solid #6673d4;
  border-bottom: 1px solid #6673d4;
  padding: 37px 0;
  text-align: center;
`;
function Footer() {
  return (
    <div style={style.footer}>
      <Container maxWidth="md">
        <a href="" className="active">
          <img src={logo} style={style.img}></img>
        </a>
        <P>
          Trang Web này đang trong quá trình hoàn thiện và sẽ thêm nhiều câu
          hỏi, đề thi cũng như tính năng mới. Nếu bạn có đóng góp ý kiến về
          trang Web để được hoàn thiện hơn (hoặc gửi đề thi mới cho chúng tôi),
          các bạn hãy Liên Hệ với chúng tôi. Trân trọng cảm ơn!
        </P>
        <p style={{ textAlign: "center", paddingBottom: "20px" }}>
          Version 1.0.1 Copyright ©Thay Phong, 2021. All rights reserved.
        </p>
      </Container>
    </div>
  );
}

export default Footer;
