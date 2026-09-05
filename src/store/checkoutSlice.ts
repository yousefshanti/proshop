import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ShippingAddress, PaymentDetails, CheckoutState } from '../types'

const initialState: CheckoutState = {
  shipping: { country: '', city: '', zip: '', street: '' },
  payment: { nameOnCard: '', cardNumber: '', expMonth: '', expYear: '', cvc: '' },
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShipping(state, action: PayloadAction<ShippingAddress>) {
      state.shipping = action.payload
    },
    setPayment(state, action: PayloadAction<PaymentDetails>) {
      state.payment = action.payload
    },
  },
})

export const { setShipping, setPayment } = checkoutSlice.actions
export default checkoutSlice.reducer
