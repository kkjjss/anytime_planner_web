import React from "react";
import Root from "./Router";
import { useState } from "react";
import { auth } from "./firebase.config";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

    return (
        <div className="App">
            <Root isLoggedIn={isLoggedIn} />
        </div>
    );
}

export default App;
