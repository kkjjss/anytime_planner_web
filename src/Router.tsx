import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

export default function Root() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function AuthRouter({ children }: types.AuthRouterProps): JSX.Element {
        return isLoggedIn ? children : <Navigate to="/login" />;
    }

    return (
        <BrowserRouter>
            {/* <Routes>
                <Route path="/" element={<Home />} />
            </Routes> */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <AuthRouter>
                            <Home />
                        </AuthRouter>
                    }
                />
            </Routes>

            {/* <Routes>{isLoggedIn ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Login />} />}</Routes> */}
        </BrowserRouter>
    );
}

declare module types {
    interface AuthRouterProps {
        children: JSX.Element;
    }
}
