import React from "react";

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from "../redux/slices/filterSlice";
import {RootState} from "../redux/store";

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

// interface RootState {
//     filter: {
//         categoryId: number;
//     };
// }

const Categories: React.FC = () => {
    const dispatch = useDispatch()
    const { categoryId } = useSelector((state: RootState) => state.filter)

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
