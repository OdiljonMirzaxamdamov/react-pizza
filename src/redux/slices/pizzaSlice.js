import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";


export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const { pagination, category, search, sortBy } = params;
    const { data } = await axios.get(`https://17d2006fd5b63307.mokky.dev/items?${pagination}${category}${search}${sortBy}`);
    return data.items;
},);



const initialState = {
    items: [],
    status: 'loading',
}


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,

    // reducers: {
    //     setItems: (state, action) => {
    //         state.items = action.payload
    //     },
    //
    // },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = "loading"
                state.items = []
                console.log(state, 'loading')
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = "success"
                console.log(state, 'success')
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = "error"
                state.items = []
                console.log(state, 'error')
            })
    }
})



// export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
