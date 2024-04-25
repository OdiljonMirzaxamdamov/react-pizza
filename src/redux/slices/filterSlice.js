import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    categoryId: 0,
    sort: {name: 'популярности', sortProperty: 'rating'},
    currentPage: 1,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },

        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },

        setSortType: (state, action) => {
            state.sort = action.payload
        },

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },

        setFilters: (state, action) => {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
        },
    },
})



export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
