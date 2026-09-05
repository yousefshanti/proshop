import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import checkoutReducer from './checkoutSlice'
import orderReducer from './orderSlice'
import authReducer from './authSlice'
import productsReducer from './productsSlice'
import wishlistReducer from './wishlistSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    auth: authReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
  },
})

