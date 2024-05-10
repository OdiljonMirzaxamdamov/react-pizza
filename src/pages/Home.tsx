import React from "react";
import qs from 'qs';
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'; // Это у нас подключение категорий и сортировки с помощью Редакса
import { FilterSliceState, setFilters} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState } from "../redux/store";


// Это мы сделали ReExport компонентов через один файл, для более легкой читабельности.
import { Categories, Sort, Skeleton, PizzaBlock, Pagination, HomeEmpty } from "../components";
import { sortList } from "../components/Sort";



const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef<boolean>();
    const isMounted = React.useRef();

    const { categoryId, sort, currentPage, searchValue } = useSelector((state: RootState) => state.filter);
    const { items, status } = useSelector((state: RootState) => state.pizza);
    // console.log(items)

    const getPizzas = async () => {
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const sortBy = `&sortBy=${sort.sortProperty}`;
        const search = searchValue ? `&title=*${searchValue}` : '';
        const pagination = `page=${currentPage}&limit=4`;

        //@ts-ignore
        dispatch(fetchPizzas({ category, sortBy, search, pagination }));

        window.scrollTo(0, 0);
    };


    // Если изменили параметры и был первый рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                categoryId: categoryId > 0 ? categoryId : null,
                sortProperty: sort.sortProperty,
                currentPage
            };

            const queryString = qs.stringify(params, {skipNulls: true});

            navigate(`/?${queryString}`)
        }

        if (window.location.search) {
            fetchPizzas({});
        };
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);


    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        getPizzas();
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);


    //!!!!!!! Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
    React.useEffect(() => {
        if (window.location.search) {
            //тут мы немного обманываем TS, код сначало переводим в unknown, а потом его в FilterSliceState.
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as FilterSliceState;
            //тут добавился || sortList[0], чтобы исключить undefined
            const sort = sortList.find((obj) => obj.sortProperty === params.sort.sortProperty) ?? sortList[0];

            dispatch(setFilters({...params, sort}));

            isSearch.current = true;
        }
    }, []);



    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    // тут прикрутил Link для открытия попапа подробной инфы пиццы, это делается через реакт-роутек, хук useParams
    // здесь мы получаем "/pizza/:id" и передаём его в App.js, дальше от туда передаём id в FullPizza.jsx
    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId}/>
                <Sort sort={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? <HomeEmpty /> : <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>}
            <Pagination />
        </div>
    )
}

export default Home;
