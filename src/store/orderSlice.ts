import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Order, OrderState } from '../types'

const initialState: OrderState = {
  lastOrder: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder(state, action: PayloadAction<Order>) {
      state.lastOrder = action.payload
    },
  },
})

export const { placeOrder } = orderSlice.actions
export default orderSlice.reducer
