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
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="content">

                    <Routes>
                        <Route path="/" element={<Home searchValue={searchValue} />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/cart-empty" element={<CartEmpty />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

            </div>
        </div>
    );
}


export default App;
