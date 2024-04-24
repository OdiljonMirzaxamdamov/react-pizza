import React from "react";
import {Link} from "react-router-dom";

import logoNotFound from '../assets/img/sad-pizza.jpg'


export const HomeEmpty = () => {

    return (
        <div className="container--empty">
            <h2>Произошла ошибка 😕</h2>
            <p>
                К сожалению, не удалось получить пиццы<br/>
                попробуйте повторить попытку позже.
            </p>
            <img src={logoNotFound} alt="Empty home"/>
            <Link to="/" className="button button--black">
                <span>обновить</span>
            </Link>
        </div>
    )
}

export default HomeEmpty;
