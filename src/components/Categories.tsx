import React from "react";

import { useDispatch } from 'react-redux'
import { setCategoryId } from "../redux/slices/filterSlice";

//библиотеку ahooks мы установили и там используем метод useWhyDidYouUpdate
// этот метод нам нужен для того, чтобы(пофиксить) понять в каком компоненте произошла перерисовка
// import { useWhyDidYouUpdate } from "ahooks";

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

type CategoryIdProps = {
    categoryId: number
}

const Categories: React.FC<CategoryIdProps> = React.memo(({ categoryId }) => {
    const dispatch = useDispatch()

    //Короче мы удалили const { categoryId } = useSelector((state: RootState) => state.filter)
    // и значение categoryId начали передавать во внутрь с помощью callBack через Home с помощью Props {categoryId}
    // Также весь код обернули в React.memo(), это мы сделали чтобы остановить лишние перерисовки.
    // React.memo() запрещает перерисовку, если конкретно Props.categoryId не меняется, значит он этот компонент перерисовать не будет.
    // Теперь когда мы меняем сортировку или вводим что-либо в поиске, компонент Категории не перерисовываются.
    // Для проверки, изменяется какой элемент можно использовать import { useWhyDidYouUpdate } from "ahooks";
    // это показывает что и как изменился типа как console.log, если categoryId рендерится то он показывает
    // useWhyDidYouUpdate('Categories', {categoryId})

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li
                        key={i}
                        onClick={() => dispatch(setCategoryId(i))}
                        className={categoryId === i ? "active" : ''}>
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    )
})


export default Categories
