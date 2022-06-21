import React from "react";
import "./Home.scss";
import logo from "../../assets/logo.png";

export default function Home() {
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
            </div>
        </div>
    );
}
