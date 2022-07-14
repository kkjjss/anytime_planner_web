import React, { useEffect } from "react";
import Router from "Router";
import { useState } from "react";
import { authService } from "firebaseConfig";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [init, setInit] = useState(false);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return <div className="App">{init ? <Router isLoggedIn={isLoggedIn} /> : <div>"로그인 중"</div>}</div>;
}

export default App;
