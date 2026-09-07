import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { WishlistItem, WishlistState } from '../types'

const initialState: WishlistState = {
  items: [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<WishlistItem>) {
      const exists = state.items.some((i) => i.id === action.payload.id)
      state.items = exists
        ? state.items.filter((i) => i.id !== action.payload.id)
        : [...state.items, action.payload]
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
  },
})

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
