import React from "react";
import {Route, Routes} from "react-router-dom";

import './App.css';
import './scss/app.scss'

import Header from './components/Header'
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CartEmpty from "./pages/Cart-empty";
import NotFound from "./components/NotFoundBlock";


function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/cart-empty" element={<CartEmpty />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}


export default App;
