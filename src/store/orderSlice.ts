import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartLine } from './cartSlice'
import type { ShippingAddress, PaymentDetails } from './checkoutSlice'

export type Order = {
  id: string
  lines: CartLine[]
  shipping: ShippingAddress
  payment: PaymentDetails
  subtotal: number
  tax: number
  shipping_cost: number
  total: number
}

type OrderState = {
  lastOrder: Order | null
}

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
