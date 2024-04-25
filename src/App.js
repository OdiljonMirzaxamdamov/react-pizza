import React from "react";
import {Route, Routes} from "react-router-dom";

import './App.css';
import './scss/app.scss'

import Header from './components/Header'
import Home from "./pages/Home";
import HomeEmpty from "./pages/Home-empty";
import Cart from "./pages/Cart";
import CartEmpty from "./pages/Cart-empty";
import NotFound from "./components/NotFoundBlock";
import FullPizza from "./pages/FullPizza";


function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home-empty" element={<HomeEmpty/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/cart-empty" element={<CartEmpty/>}/>
                    <Route path="/pizza/:id" element={<FullPizza/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}


export default App;
