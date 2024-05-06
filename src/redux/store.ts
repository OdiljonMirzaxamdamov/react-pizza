import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";

export const store = configureStore ({
    reducer: {
        filter,
        cart,
        pizza,
    },
})

//RootState возвращает фактическую глобальную типизацию для reduce и внутренних файлов,
// это мы можем использовать в компонентах где есть useSelector => state, т.к. state просит типизацию
export type RootState = ReturnType<typeof store.getState>

