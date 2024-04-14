import React from "react";
import { Route, Routes } from "react-router-dom";

import './App.css';
import './scss/app.scss'

import Header from './components/Header'
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CartEmpty from "./pages/Cart-empty";
import NotFound from "./components/NotFoundBlock";

export const SearchContext = React.createContext();

function App() {
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/cart-empty" element={<CartEmpty/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
}


export default App;
