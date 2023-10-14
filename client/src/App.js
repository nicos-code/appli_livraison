// import logo from './logo.svg';
import "./App.css";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";

// import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

//en utilisant le composant Route
export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}
