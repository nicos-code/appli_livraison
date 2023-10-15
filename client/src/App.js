// import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Order from "./pages/Order";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import Logas from "./pages/Logas";
import User from "./pages/User";

import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.css";

//en utilisant le composant Route
export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/logas" element={<Logas />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}
