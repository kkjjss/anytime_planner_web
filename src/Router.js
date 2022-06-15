import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";

export default function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
