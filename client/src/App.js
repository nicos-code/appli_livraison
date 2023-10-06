// import logo from './logo.svg';
import './App.css';

import Home from "./pages/Home";
import Cart from "./pages/Cart";

// import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//en utilisant le composant Route
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

