import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";


// в 19-уроке подключили Outlet компонент MainLayout, оно используется для больших проектов, тут мы делаем для примера

const MainLayout: React.FC = () => {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}


export default MainLayout;
