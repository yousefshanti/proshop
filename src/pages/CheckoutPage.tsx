import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Field from '../components/Field'
import StepIndicator from '../components/StepIndicator'
import OrderSummaryCard from '../components/OrderSummaryCard'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setShipping, setPayment } from '../store/checkoutSlice'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const lines = useAppSelector((state) => state.cart.lines)
  const savedShipping = useAppSelector((state) => state.checkout.shipping)
  const savedPayment = useAppSelector((state) => state.checkout.payment)

  const [country, setCountry] = useState(savedShipping.country)
  const [city, setCity] = useState(savedShipping.city)
  const [zip, setZip] = useState(savedShipping.zip)
  const [street, setStreet] = useState(savedShipping.street)
  const [nameOnCard, setNameOnCard] = useState(savedPayment.nameOnCard)
  const [cardNumber, setCardNumber] = useState(savedPayment.cardNumber)
  const [expMonth, setExpMonth] = useState(savedPayment.expMonth)
  const [expYear, setExpYear] = useState(savedPayment.expYear)
  const [cvc, setCvc] = useState(savedPayment.cvc)

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0)
  const tax = subtotal * 0.01
  const shippingCost = 0
  const total = subtotal + tax + shippingCost

  function handleReview() {
    dispatch(setShipping({ country, city, zip, street }))
    dispatch(setPayment({ nameOnCard, cardNumber, expMonth, expYear, cvc }))
    navigate('/checkout/review')
  }

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-10">
      <p className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">Review Order</p>
      <div className="mt-6">
        <StepIndicator steps={[{ n: 1, label: 'Shipping and Payment' }, { n: 2, label: 'Place an Order' }]} current={1} />
      </div>

      <div className="grid lg:grid-cols-[1fr_384px] gap-10 mt-10 items-start">
        <div className="bg-surface rounded-card p-8">
          <p className="font-sans font-bold text-[24px] text-ink">Shipping Address</p>
          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <Field label="Country" value={country} onChange={setCountry} />
            <Field label="City" value={city} onChange={setCity} />
            <Field label="Zip Code" value={zip} onChange={setZip} />
            <Field label="Street Address" value={street} onChange={setStreet} />
          </div>

          <p className="font-sans font-bold text-[24px] text-ink mt-10">Payment Details</p>
          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <Field label="Name on Card" value={nameOnCard} onChange={setNameOnCard} />
            <Field label="Card Number" value={cardNumber} onChange={setCardNumber} />
            <Field label="Expiration Month" value={expMonth} onChange={setExpMonth} placeholder="03" />
            <Field label="Expiration Year" value={expYear} onChange={setExpYear} placeholder="25" />
            <Field label="CVC" value={cvc} onChange={setCvc} placeholder="657" />
          </div>
        </div>

        <OrderSummaryCard
          subtotal={subtotal}
          tax={tax}
          shipping={shippingCost}
          total={total}
          ctaLabel="Review order"
          onCta={handleReview}
        />
      </div>
    </div>
  )
}
