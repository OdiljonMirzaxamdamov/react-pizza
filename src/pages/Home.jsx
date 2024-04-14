import React from "react";
import axios from "axios";

import { SearchContext } from "../App"; // Это у нас подключение поиска с помощью юзКонтекста
import { useSelector } from 'react-redux'; // Это у нас подключение категорий и сортировки с помощью Редакса

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";


export const Home = () => {
    const { categoryId, sort } = useSelector((state) => state.filter);

    const {searchValue} = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);


    React.useEffect(() => {
        setIsLoading(true)

        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const sortBy = `&sortBy=${sort.sortProperty}`;
        const search = searchValue ? `&title=*${searchValue}` : '';
        const pagination = `page=${currentPage}&limit=4`;

        axios.get(`https://17d2006fd5b63307.mokky.dev/items?${pagination}${category}${search}${sortBy}`)
            .then((resMetaPagination) => {
                console.log(resMetaPagination)
                setItems(resMetaPagination.data.items)
                setIsLoading(false)
            });
        window.scrollTo(0, 0); //делает скролл вверх при открытии страницы основной страницы
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);


    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ? skeleton : pizzas}</div>
            <Pagination onChangePage={setCurrentPage} />
        </div>
    )
}

export default Home;
