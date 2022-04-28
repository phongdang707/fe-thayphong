import React from "react";
import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import logo from "../../assets/images/ngan-mau1.png";

const A = styled.a`
  margin: auto;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background: #b2deff;
  border-radius: 22px;
  height: 44px;
  display: inline-block;
  line-height: 44px;
  padding-right: 0 !important;
`;
const Wrapper = styled.div`
  display: flex;
`;
const Span = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  line-height: 1.1;
  font-weight: 700;
  color: #065592;
  padding-left: 10px;
`;

function Header() {
  return (
    <Wrapper>
      <a href="" className="active" style={{ width: "185px" }}>
        <img src={logo} style={{ width: "100%", height: "100%" }}></img>
      </a>
      <A href="login">
        <Span>Đăng nhập</Span>
        <AccountCircleIcon
          style={{ margin: "10px", color: "#065592" }}
        ></AccountCircleIcon>
      </A>
      <i className="fa fa-bars"></i>
    </Wrapper>
  );
}

export default Header;
