import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import productsData from '../data/products.json'
import type { Product, ProductsState } from '../types'

const initialState: ProductsState = {
  items: productsData as Product[],
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload)
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const i = state.items.findIndex((p) => p.id === action.payload.id)
      if (i !== -1) state.items[i] = action.payload
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload)
    },
  },
})

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions
export default productsSlice.reducer
