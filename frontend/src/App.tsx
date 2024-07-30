import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import api from "./http/base_api";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import Cards from "./pages/cards";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PrivateRoute />}>
                        <Route index element={<Cards />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
