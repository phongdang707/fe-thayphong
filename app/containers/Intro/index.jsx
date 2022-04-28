import React from "react";
import history from "utils/history";

import logo from "../../assets/images/logo-hcn-white.png";
import logo1 from '../../assets/svg/1 SCENE.svg';
import diversity from '../../assets/svg/2 SCENE.svg'
import matrix from '../../assets/images/Allura - Online Searching.png'
import answer from '../../assets/images/Humaaans - 3 Characters.png'

import '../../assets/css/spectre.css';
import '../../assets/css/yeo.css';
import '../../assets/css/spectre-exp.css';
import '../../assets/css/spectre-icons.css';

import Body from "./body";
import Header from "./header";
import Footer from "./footer";
import Container from "@material-ui/core/Container";

function Intro() {
    const onClick = () => {
        history.push("login");
    };
    return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Poppins:200,400,700" rel="stylesheet"/>
            <div>
                <div className="yeo-slogan">
                    <div className="container yeo-header">
                        <div className="columns">
                            <div className="column col-12">
                                <header className="navbar">
                                    <section className="navbar-section">
                                        <a className="navbar-brand logo" href="./">
                                            <img className="logo-img" src={logo}
                                                 style={{width: "100%", height: "100%"}}
                                                 alt=""/>
                                        </a>
                                    </section>
                                    <section className="navbar-section hide-sm">
                                        <a className="btn btn-link" href="#we-do">Giới thiệu</a>
                                        <a className="btn btn-link" href="register">Đăng ký</a>
                                        <a className="btn btn-primary btn-hire-me" href="login">Đăng nhập</a>
                                    </section>
                                </header>
                            </div>
                        </div>
                    </div>
                    <div className="container slogan">
                        <div className="columns">
                            <div className="column col-7 col-sm-12">
                                <div className="slogan-content">
                                    <h1>
                                        <span className="slogan-bold">Hệ Thống</span>
                                        <span className="slogan-bold">Khảo Thí</span>
                                        <span className="slogan-bold">Và Thi Trắc Nghiệm</span>
                                    </h1>
                                    <p>Hệ thống tự động trộn đề và chuyển đến cho học sinh kiểm tra - thi thử trên máy
                                        tính, điện thoại, máy tính bảng</p>
                                    <a className="btn btn-primary btn-lg btn-start" href="login" style={{marginRight: '20px'}}>Đăng nhập</a>
                                    <a className="btn btn-primary btn-lg btn-start" href="register" style={{background: '#019e7feb'}}>Đăng ký</a>
                                </div>
                            </div>
                            <div className="column col-5 hide-sm">
                                <img className="slogan-img" src={logo1} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="yeo-do" id="we-do">
                    <div className="container yeo-body">
                        <div className="columns">
                            <div className="column col-12">
                                <h2 className="feature-title">TRẮC NGHIỆM ONLINE</h2>
                            </div>
                            <div className="column col-4 col-sm-12">
                                <div className="yeo-do-content">
                                    {/*<img src="./images/what-we-do-1.svg" alt=""/>*/}
                                    <img src="https://s.tracnghiem.net/assets/images/home/feature1.jpg" alt=""/>
                                    <h3>Đề thi học kỳ</h3>
                                    <p>Ngân hàng câu hỏi đầy đủ được trộn tạo đề theo cấu trúc phân loại giúp các em dễ
                                        dàng ôn tập online đề thi giữa học kỳ, thi học kỳ theo các chủ đề đã học</p>
                                </div>
                            </div>
                            <div className="column col-4 col-sm-12">
                                <div className="yeo-do-content">
                                    <img src="https://s.tracnghiem.net/assets/images/home/feature2.jpg" alt=""/>
                                    <h3>Đề thi THPT QG</h3>
                                    <p>Tổng hợp đề thi trắc nghiệm online THPT QG kèm đáp án và lời giải chi tiết</p>
                                </div>
                            </div>
                            <div className="column col-4 col-sm-12">
                                <div className="yeo-do-content">
                                    <img src="https://s.tracnghiem.net/assets/images/home/feature3.jpg" alt=""/>
                                    <h3>Đề kiểm tra</h3>
                                    <p>Hệ thống bài kiểm tra 1 tiết, kiểm tra 15 phút được thiết kế theo hình thức trắc
                                        nghiệm online giúp học sinh luyện tập và chấm điểm trực tuyến</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="yeo-team" id="team">
                    <div className="container yeo-body">
                        <div className="columns">
                            <div className="column col-12">
                                <h2 className="feature-title">ĐA DẠNG - THÔNG MINH - CHÍNH XÁC</h2>
                            </div>
                            <div className="column col-12">
                                <div className="columns">
                                    <div className="column col-6 col-sm-12">
                                        <img src={diversity} alt="diversity" className="float-right"></img>
                                    </div>
                                    <div className="column col-6 col-sm-12"
                                         style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                                        < div>
                                            < h3 className="title25Bold">Đa dạng nội dung</h3>
                                            <p className="title25Bold">Cung cấp đa dạng nội dung các câu hỏi trắc nghiệm
                                                thuộc
                                                nhiều lĩnh vực khác nhau</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="column col-12">
                                <div className="columns">
                                    <div
                                        className="column col-6 col-sm-12 "
                                        style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                                        <div>
                                            <h3 className="title26Bold">Ma trận câu hỏi</h3>
                                            <p className="title26Bold">Hệ thống sẽ dựa vào ma trận câu hỏi phong phú
                                                để
                                                tự
                                                tổng hợp thành đề trắc nghiệm</p>
                                        </div>
                                    </div>
                                    <div className="column col-6 col-sm-12">
                                        <img src={matrix} alt="diversity" className="float-left"></img>
                                    </div>
                                </div>
                            </div>

                            <div className="column col-12">
                                <div className="columns">
                                    <div className="column col-6 col-sm-12">
                                        <img src={answer} alt="diversity" className="float-right"></img>
                                    </div>
                                    <div className="column col-6 col-sm-12"
                                         style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}}>

                                        <div>

                                            <h3 className="title25Bold">Đáp án chi tiết</h3>
                                            <p className="title25Bold">Sau khi hoàn thành bài kiểm tra trắc nghiệm
                                                hệ
                                                thống
                                                sẽ thông báo số điểm đạt được kèm lời giải chi tiết</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="yeo-footer">
                    <div className="container">
                        <div className="columns">
                            <div className="column col-12">
                                <div className="yeo-footer-content">
                                    <p>
                                        Trang Web này đang trong quá trình hoàn thiện và sẽ thêm nhiều câu
                                        hỏi, đề thi cũng như tính năng mới. Nếu bạn có đóng góp ý kiến về
                                        trang Web để được hoàn thiện hơn (hoặc gửi đề thi mới cho chúng tôi),
                                        các bạn hãy Liên Hệ với chúng tôi. Trân trọng cảm ơn!
                                    </p>
                                    <p style={{textAlign: "center", paddingBottom: "20px"}}>
                                        Version 1.0.1 Copyright ©Thay Phong, 2021. All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<Header></Header>*/}
            {/*<Body></Body>*/}
            {/*<Footer></Footer>*/}
            {/* <button onClick={onClick}>Đăng nhập</button> */}
        </div>
    );
}

export default Intro;
