import {createSlice, PayloadAction} from '@reduxjs/toolkit'

//enum нас спасает в файлах Sort и Home, там sortProperty не понимал какой должен был быть
export enum SortPropertyEnam {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

type SortTs = {
    name: string;
    sortProperty: SortPropertyEnam;
}

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: SortTs;
}


const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {name: 'популярности', sortProperty: SortPropertyEnam.RATING_DESC},
}


export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },

        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },

        setSortType: (state, action: PayloadAction<SortTs>) => {
            state.sort = action.payload
        },

        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },

        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        },
    },
})



export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
