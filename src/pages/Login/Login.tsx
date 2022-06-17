import React from "react";
import "./Login.scss";
import logo from "../../assets/logo.png";

export default function Login() {
    return (
        <div className="Login">
            <div className="container">
                <div className="titlebox">
                    <div className="title">
                        <img alt="logo" src={logo} />
                    </div>
                    <div className="subtitle">반복 작업 최적화 플래너</div>
                    <div className="descriptionbox">
                        <div className="desc 1">◆ 매일 반복되는 일</div>
                        <div className="desc 2">◆ 매주 반복되는 일</div>
                        <div className="desc 3">◆ 특정 요일마다 반복되는 일</div>
                        <div className="desc 4">◆ 일정 기간안에 끝내야 하는 일</div>
                        <div>...</div>
                    </div>
                </div>
                <div className="loginbox">
                    <div className="email login">
                        <div className="title">이메일 아이디로 로그인하기</div>
                        <div className="inputbox">
                            <input className="email" type="text" required />
                            <span>이메일</span>
                        </div>
                        <div className="inputbox">
                            <input className="password" type="text"required/>
                            <span>비밀번호</span>
                        </div>

                        <button>로그인</button>
                    </div>
                    <hr />
                    <div className="social login">
                        <div className="title">소셜 아이디로 로그인하기</div>
                        <button className="kakao">카카오로 계속하기</button>
                        <button className="google">구글로 계속하기</button>
                        <button className="github">깃허브로 계속하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
