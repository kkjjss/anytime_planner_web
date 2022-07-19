import React from "react";
import "./Header.scss";
import logo from "assets/logo.png";
import { auth, authInstance } from "firebaseConfig";

export default function Header() {
    const currentUser = auth.currentUser?.displayName;
    async function logout() {
        await authInstance.signOut(auth);
    }

    return (
        <div className="Header">
            <div className="left">
                <div className="logo">
                    <img alt="logo" src={logo} />
                </div>
            </div>
            <div className="right">
                <div className="info">
                    {currentUser}
                </div>
                <div className="logout">
                    <button onClick={logout}>로그아웃</button>
                </div>
            </div>
            
        </div>
    );
}
