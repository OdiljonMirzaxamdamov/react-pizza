import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import PizzaBlock from "../components/PizzaBlock";

export const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        fetch('https://17d2006fd5b63307.mokky.dev/items')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(!isLoading)
            })
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) : items.map((obj) =>
                    <PizzaBlock
                        key={obj.id} {...obj} />)}
            </div>
        </>
    )
}

export default Home;
