import React from "react";
import Router from "Router";
import { useState } from "react";
import { authService } from "firebaseConfig";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

    return (
        <div className="App">
            <Router isLoggedIn={isLoggedIn} />
        </div>
    );
}

export default App;
