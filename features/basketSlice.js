import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    items: []
}

export const basketSlice = createSlice({
    name:     'basket',
    initialState,
    reducers: {
        addToBasket:      (state, action) => {
            state.items.push(action.payload)
        },
        removeFromBasket: (state, action) => {
            const itemToRemove = state.items.findIndex(item => item._id !== action.payload)
            if (itemToRemove <= 0) {
                state.items.splice(itemToRemove, 1)
            } else {
                console.warn(`can't remove product (id: ${action.payload}) as its not in basket!`)
            }
        }
    }
})

export const {addToBasket, removeFromBasket} = basketSlice.actions

export const selectBasketItems = state => state.basket.items

export const selectBasketItemsWithId = (state, _id) => state.basket.items.filter(item => item._id === _id)

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => total += item.price, 0)

const basketReducer = basketSlice.reducer

export default basketReducer
