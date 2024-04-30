import { Route, Routes } from "react-router-dom";

import './App.css';
import './scss/app.scss'

import Home from "./pages/Home";
import HomeEmpty from "./pages/Home-empty";
import Cart from "./pages/Cart";
import CartEmpty from "./pages/Cart-empty";
import NotFound from "./components/NotFoundBlock";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";


function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home/>}/>
                <Route path="home-empty" element={<HomeEmpty/>}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="cart-empty" element={<CartEmpty/>}/>
                <Route path="pizza/:id" element={<FullPizza/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}
// в 19-уроке подключили Outlet компонент MainLayout, оно используется для больших проектов, тут мы делаем для примера

export default App;
