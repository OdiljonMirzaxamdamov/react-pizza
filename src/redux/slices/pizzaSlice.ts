import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";


type PizzaItem = {
    category: number;
    id: number;
    imageUrl: string;
    price: number;
    rating: number;
    size: number[];
    title: string;
    types: number[];
}


// Для типизации когда все ключ+значения одинаковые, можно упростить типизацию следующим образом
// Record<string, string> означает что мы передаём аргументы params которые все являются string.
// А вот то, что мы сделали createAsyncThunk<ApiResponse, это по сути говорим что ApiResponse это Promis
export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>('pizza/fetchPizzasStatus',
    async (params) => {
        const { pagination, category, search, sortBy } = params;
        const { data } = await axios.get(
            `https://17d2006fd5b63307.mokky.dev/items?${pagination}${category}${search}${sortBy}`
        );

        return data.items as PizzaItem[];
    },
);
// Если у нас аргументы разные, что params делаем через type, ниже пример
//
// type FetchPizzaArguments = {
//     pagination: string;
//     category: string;
//     search: string;
//     sortBy: string;
// }
//
// export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',
//     async (params: FetchPizzaArguments) => {
//         const { pagination, category, search, sortBy } = params;
//         const { data } = await axios.get<ApiResponse>(
//             `https://17d2006fd5b63307.mokky.dev/items?${pagination}${category}${search}${sortBy}`
//         );
//
//         return data.items;
//     },
// );


export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface pizzaSliceState {
    items: PizzaItem[],
    status: Status,
}

const initialState: pizzaSliceState = {
    items: [],
    status: Status.LOADING,
}


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<PizzaItem[]>) => {
            state.items = action.payload
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.items = []
                state.status = Status.LOADING
            })
            .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.items = []
                state.status = Status.ERROR
            })
    }
})



// export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
