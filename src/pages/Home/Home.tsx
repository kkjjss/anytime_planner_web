import React from "react";
import "./Home.scss";
import logo from "../../assets/logo.png";
import { auth, authInstance } from "firebaseConfig";

export default function Home() {
    async function logout(){
        const data = await authInstance.signOut(auth);
        console.log(data);
    }
    return (
        <div className="Login">
            <div className="container">
                <div className="titlebox">
                    <div className="title">
                        <img alt="logo" src={logo} />
                    </div>

                    <button onClick={logout}>로그아웃</button>
                </div>
            </div>
        </div>
    );
}
