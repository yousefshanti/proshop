import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import checkoutReducer from './checkoutSlice'
import orderReducer from './orderSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
