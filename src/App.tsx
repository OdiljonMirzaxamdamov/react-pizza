import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import './App.css';
import './scss/app.scss'

// в 19-уроке подключили Outlet компонент MainLayout, оно используется для больших проектов, тут мы делаем для примера
import MainLayout from "./layouts/MainLayout";

// в 27-уроке узнал про React.lazy/React.loadable-components для Code-splitting(загрузка компонентов по очереди)
// по сути это своего рода Promise (.then), выполняет загрузку только когда это необходимо.
// тут мы все страницы, кроме Home, обернём в метод Lazy, он заставляет загрузиться страницу только тогда-когда будет открыта данное окно
// окно Home оставляем, чтобы он открывался сразу же при первом рендере.
// Suspense - это такой метод который говорит fallback, в моменте когда идет загрузка.
import Home from "./pages/Home";
const HomeEmpty = lazy(() => import("./pages/Home-empty"));
const Cart = lazy(() => import("./pages/Cart"));
const CartEmpty = lazy(() => import("./pages/Cart-empty"));
const FullPizza = lazy(() => import("./pages/FullPizza"));
const NotFound = lazy(() => import("./components/NotFoundBlock"));


function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home/>}/>
                    <Route path="home-empty" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <HomeEmpty />
                        </Suspense>}
                    />
                    <Route path="cart" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Cart />
                        </Suspense>}
                    />
                    <Route path="cart-empty" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <CartEmpty />
                        </Suspense>}
                    />
                    <Route path="pizza/:id" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <FullPizza />
                        </Suspense>}
                    />
                    <Route path="*" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <NotFound />
                        </Suspense>}
                    />
            </Route>
        </Routes>
    );
}


export default App;
