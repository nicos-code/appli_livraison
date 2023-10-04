import logo from './logo.svg';
import './App.css';

import Home from "./pages/Home";
import Panier from "./pages/Panier";

import Header from "./pages/composant/Header";

import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//en utilisant le composant Route
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/panier" element={<Panier/>}/>
        {/* <Route path="/piano" element={<Piano/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

