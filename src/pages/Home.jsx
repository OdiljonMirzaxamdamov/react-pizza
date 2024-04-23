import React from "react";
import axios from "axios";
import qs from 'qs';
import { useNavigate } from "react-router-dom";

import { SearchContext } from "../App"; // Это у нас подключение поиска с помощью юзКонтекста
import {useDispatch, useSelector} from 'react-redux'; // Это у нас подключение категорий и сортировки с помощью Редакса
import { setFilters } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";


export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef();
    const isMounted = React.useRef();

    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    const fetchPizzas = async () => {
        setIsLoading(true)

        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const sortBy = `&sortBy=${sort.sortProperty}`;
        const search = searchValue ? `&title=*${searchValue}` : '';
        const pagination = `page=${currentPage}&limit=4`;

        const resMetaPagination = await axios.get(`https://17d2006fd5b63307.mokky.dev/items?${pagination}${category}${search}${sortBy}`)
        setItems(resMetaPagination.data.items)
        setIsLoading(false)
    };


    // Если изменили параметры и был первый рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`)
        }

        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);


    // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                }),
            );

            isSearch.current = true;
        }
    }, []);


    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0); //делает скролл вверх при открытии страницы основной страницы

        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
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
            <Pagination />
        </div>
    )
}

export default Home;
