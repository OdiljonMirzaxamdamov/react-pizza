import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type CartItemSlice = {
    id: number;
    title: string;
    type: string;
    size: number;
    price: number;
    imageUrl: string;
    count: number;
}

interface CartSliceState {
    totalPrice: number,
    totalItems: number,
    items: CartItemSlice[],
}


const initialState: CartSliceState = {
    totalPrice: 0,
    totalItems: 0,
    items: [],
}

const defaultCartItem: CartItemSlice = {
    id: 0,
    title: '',
    type: '',
    size: 0,
    price: 0,
    imageUrl: '',
    count: 0,
}


const total = (state: CartSliceState) => {
    state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
    }, 0);

    state.totalItems = state.items.reduce((sum, obj) => {
        return obj.count + sum;
    }, 0);
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Раньше было action: PayloadAction<CartItemSlice>
        // потом Ильюха подсказал сделать action: PayloadAction<Pick<CartItemSlice, 'id'>>
        // Pick даёт возможность выбрать конкретный элемент из объекта.
        // и это позволило удалить CartItemSlice из CartItem - dispatch(addItem({ id }) as CartItemSlice)
        addItem: (state, action: PayloadAction<Pick<CartItemSlice, 'id'>>) => {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else  {
                state.items.push({...defaultCartItem, ...action.payload, count: 1})
            }

            total(state);
        },


        minusItem: (state, action: PayloadAction<Pick<CartItemSlice, 'id'>>) => {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if (findItem) {
                findItem.count--;
            }

            total(state);
        },


        removeItem: (state, action: PayloadAction<Pick<CartItemSlice, 'id'>>) => {
            state.items = state.items.filter((obj) => obj.id !== action.payload.id)

            total(state);
        },


        clearItems: (state) => {
            state.items = [];

            total(state);
        },
    },
})



export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
