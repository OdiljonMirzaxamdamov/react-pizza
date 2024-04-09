import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import PizzaBlock from "../components/PizzaBlock";


export const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({name: 'популярности', sortProperty: 'rating'});

    React.useEffect(() => {
        setIsLoading(true)
        fetch(`https://17d2006fd5b63307.mokky.dev/items?${categoryId > 0 ? `category=${categoryId}` : ''}`
                + '&sortBy=' + sortType.sortProperty)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            });
        window.scrollTo(0, 0); //делает скролл вверх при открытии страницы основной страницы
    }, [categoryId, sortType]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
                <Sort value={sortType} onChangeSortType={(id) => setSortType(id)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) : items.map((obj) =>
                    <PizzaBlock
                        key={obj.id} {...obj} />)}
            </div>
        </div>
    )
}

export default Home;
