import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ShippingAddress = {
  country: string
  city: string
  zip: string
  street: string
}

export type PaymentDetails = {
  nameOnCard: string
  cardNumber: string
  expMonth: string
  expYear: string
  cvc: string
}

type CheckoutState = {
  shipping: ShippingAddress
  payment: PaymentDetails
}

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
