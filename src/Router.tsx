// import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/Home/Home";
import Auth from "pages/Auth/Auth";
import { User } from "@firebase/auth";

export default function Root({ isLoggedIn }: types.RootProps) {
    function AuthRouter({ children }: types.AuthRouterProps): JSX.Element {
        return true ? children : <Navigate to="/auth" />;
    }

    return (
        <BrowserRouter>
            {/* <Routes>
                <Route path="/" element={<Home />} />
            </Routes> */}
            {/* <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route
                    path="/"
                    element={
                        <AuthRouter>
                            <Home />
                        </AuthRouter>
                    }
                />
            </Routes> */}

            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home />} />
                    </>
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

declare module types {
    interface AuthRouterProps {
        children: JSX.Element;
    }

    interface RootProps {
        isLoggedIn: boolean;
    }
}
