import React from "react";

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from "../redux/slices/filterSlice";

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']


function Categories() {
    const dispatch = useDispatch()
    const categoryId = useSelector((state) => state.filter.categoryId)

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
}


export default Categories
