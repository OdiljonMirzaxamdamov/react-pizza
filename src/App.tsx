import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import './App.css';
import './scss/app.scss'

// в 19-уроке подключили Outlet компонент MainLayout, оно используется для больших проектов, тут мы делаем для примера
import MainLayout from "./layouts/MainLayout";

// В 27-уроке узнал про React.lazy/React.loadable-components для Code-splitting(загрузка компонентов по очереди)
// по сути это своего рода Promise (.then), выполняет загрузку только когда это необходимо, во избежание лишнего рендеринга pages.
// Тут мы все страницы, кроме Home, обернём в метод Lazy, он заставляет загрузиться страницу только тогда-когда будет открыта данное окно.
// Окно Home оставляем, чтобы он открывался сразу же при первом рендере.
// Suspense - это такой метод который говорит fallback, в моменте когда идет загрузка.
// *Для работы через сервер лучше использовать React.loadable-components
import Home from "./pages/Home";
const HomeEmpty = lazy(() => import("./components/Home-empty"));
const Cart = lazy(() => import("./pages/Cart"));
const CartEmpty = lazy(() => import("./components/Cart-empty"));
const FullPizza = lazy(() => import("./pages/FullPizza"));
const NotFoundBlock = lazy(() => import("./components/NotFoundBlock"));


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
                            <NotFoundBlock />
                        </Suspense>}
                    />
            </Route>
        </Routes>
    );
}


export default App;
