import React from "react";
import Root from "./Router";
import { useState } from "react";
import firebase from "./firebase.config";

function App() {
    const auth = firebase.auth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="App">
            <Root isLoggedIn={isLoggedIn} />
        </div>
    );
}

export default App;
