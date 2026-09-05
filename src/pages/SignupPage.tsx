import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Field from '../components/Field'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { register } from '../store/authSlice'

export default function SignupPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const authError = useAppSelector((state) => state.auth.error)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (user) navigate('/profile')
  }, [user, navigate])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setFormError('Passwords do not match')
      return
    }
    setFormError('')
    dispatch(register({ name, email, password }))
  }

  const error = formError || authError

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-8 md:py-16 grid md:grid-cols-2 gap-10 items-center">
      <div className="w-full max-w-[562px]">
        <h1 className="font-sans font-black text-[28px] sm:text-[34px] md:text-[40px] text-ink mb-2">Signup.</h1>
        <p className="font-sans text-[16px] text-muted mb-8">
          Sign up and get exclusive offers from us
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Name" value={name} onChange={setName} placeholder="Your name" />
          <Field label="Enter your email address" type="email" value={email} onChange={setEmail} placeholder="name@example.com" />
          <Field label="Enter your password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          <Field label="Confirm your password" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="••••••••" />
          {error && <p className="font-sans text-[14px] text-danger">{error}</p>}
          <button type="submit" className="h-11 bg-brand rounded-input font-sans font-bold text-[16px] text-ink">
            Sign up
          </button>
          <hr className="border-grey-300 my-4" />
          <p className="font-sans text-[14px] text-muted">
            Have an account ? <Link to="/login" className="font-bold text-ink">Login</Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block max-w-[600px] mx-auto">
        <img src="/assets/signup-illustration.png" alt="" className="w-full h-auto object-contain" />
      </div>
    </div>
  )
}
