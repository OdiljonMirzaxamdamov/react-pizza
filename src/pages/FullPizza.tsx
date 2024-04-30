import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


// через path="/pizza/:id" внутри App.js подключаем динамические ссылки
const FullPizza = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const { id } = useParams();

    //хук useNavigate это как dispatch, но только для роутера, он помогает перекидывать страницу
    const navigate = useNavigate();

    //внутри useEffect нельзя использовать async/await, поэтому мы это делаем внутри обычно функции
    React.useEffect(() => {
        async function fetchPizzaPupup() {
            try {
                const { data } = await axios.get('https://17d2006fd5b63307.mokky.dev/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении подробных данных пиццы!')

                //тут имеется ввиду, что если будет error, то будет alert и переход на главную страницу при помощи navigate
                navigate('/')
            }
        }

        //эту функцию создали специально (чтобы в нём использовать async/await) и запустили тут же
        fetchPizzaPupup();
    }, []);

    // Эта проверка нужна чтобы при первой загрузке не было ошибки undefined т.к. при первой загрузки pizza будет пустым
    if (!pizza) {
        return 'Загрузка...';
    }

    return (
        <div className="container--empty">
            <img src={pizza.imageUrl} />
            <h2> {pizza.title} 😬</h2>
            <h4> {pizza.price} P</h4>
        </div>
    )
}

export default FullPizza;
