import React, { useEffect } from "react";
import Router from "Router";
import { useState } from "react";
import { auth } from "firebaseConfig";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [init, setInit] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return <div className="App">{init ? <Router isLoggedIn={isLoggedIn} /> : <></>}</div>;
}

export default App;
