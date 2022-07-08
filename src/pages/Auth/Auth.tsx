import React, { useState } from "react";
import "./Auth.scss";
import logo from "../../assets/logo.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        //Event 인터페이스의 preventDefault() 메서드는 어떤 이벤트를 명시적으로 처리하지 않은 경우, 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 지정합니다.
        event.preventDefault();
        // throw new Error("!!");
    };

    return (
        <div className="Auth">
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
                    <form onSubmit={onSubmit}>
                        <div className="email login">
                            <div className="title">이메일 아이디로 로그인하기</div>
                            <div className="inputbox">
                                <input className="email" type="text" required value={email} onChange={onChangeEmail} />
                                <span>이메일</span>
                            </div>
                            <div className="inputbox">
                                <input className="password" type="password" required value={password} onChange={onChangePassword} />
                                <span>비밀번호</span>
                            </div>

                            <button>
                                <input type="submit" value="이메일로 로그인" />
                            </button>
                        </div>
                    </form>
                    <span className="join">회원가입</span>

                    <hr />
                    <div className="social login">
                        <div className="title">소셜 아이디로 로그인하기</div>
                        {/* <button className="kakao">카카오로 계속하기</button> */}
                        <button className="google">구글로 계속하기</button>
                        <button className="github">깃허브로 계속하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
