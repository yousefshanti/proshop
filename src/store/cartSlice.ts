import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartLine, CartState } from '../types'

const initialState: CartState = {
  lines: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ item: Omit<CartLine, 'qty'>; qty?: number }>) {
      const { item, qty = 1 } = action.payload
      const existing = state.lines.find((l) => l.id === item.id)
      if (existing) {
        existing.qty += qty
      } else {
        state.lines.push({ ...item, qty })
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.lines = state.lines.filter((l) => l.id !== action.payload)
    },
    updateQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const line = state.lines.find((l) => l.id === action.payload.id)
      if (line) line.qty = action.payload.qty
    },
  },
})

export const { addToCart, removeFromCart, updateQty } = cartSlice.actions
export default cartSlice.reducer
