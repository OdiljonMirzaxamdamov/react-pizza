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


//внутри Header мы передали данные в localStorage, а тут мы как раз вытаскиваем данные из localStorage
//и используем их чтобы при обновлении страницы, данные не очищались
const getCartFromLS = () => {
    //тут вытаскиваем данные из localStorage
    const data = localStorage.getItem('cart');

    //тут проверяем для TS, если данные(data) есть, значит парсим JSON файл или же в обратном случаем передаем пустой массив
    const items = data ? JSON.parse(data) : [];

    //тут обсчитываем totalPrice в случае, если внутри localStorage есть данные
    const totalPrice = items.reduce((sum: number, obj: CartItemSlice) => {
        return (obj.price * obj.count) + sum;
    }, 0);

    //тут обсчитываем totalItems в случае, если внутри localStorage есть данные
    const totalItems = items.reduce((sum: number, obj: CartItemSlice) => {
        return obj.count + sum;
    }, 0);

    //полученные данные передаем в initialState, чтобы они сразу отображались при обновлении страницы
    return {
        items,
        totalPrice,
        totalItems
    }
}


//используем полученные данные с localStorage
const initialState: CartSliceState = {
    totalPrice: getCartFromLS().totalPrice,
    totalItems: getCartFromLS().totalItems,
    items: getCartFromLS().items,
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
