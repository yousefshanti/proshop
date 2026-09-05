import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Field from '../components/Field'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { login } from '../store/authSlice'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const error = useAppSelector((state) => state.auth.error)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) navigate('/profile')
  }, [user, navigate])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-8 md:py-16 grid md:grid-cols-2 gap-10 items-center">
      <div className="w-full max-w-[562px]">
        <h1 className="font-sans font-black text-[28px] sm:text-[34px] md:text-[40px] text-ink mb-2">Login.</h1>
        <p className="font-sans text-[16px] text-muted mb-8">
          Login with your data that you entered during registration
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Enter your email address" type="email" value={email} onChange={setEmail} placeholder="name@example.com" />
          <Field label="Enter your password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          {error && <p className="font-sans text-[14px] text-danger">{error}</p>}
          <button type="submit" className="h-11 bg-brand rounded-input font-sans font-bold text-[16px] text-ink">
            Login
          </button>
          <div className="flex items-center justify-between font-sans text-[14px] text-muted">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              Remember me
            </label>
            <span>Forgot your password?</span>
          </div>
          <hr className="border-grey-300 my-4" />
          <Link
            to="/register"
            className="self-start px-8 h-11 flex items-center justify-center border border-brand rounded-pill font-sans font-bold text-[16px] text-ink"
          >
            Sign Up Now
          </Link>
        </form>
      </div>

      <div className="hidden md:block max-w-[500px] mx-auto">
        <img src="/assets/login-illustration.png" alt="" className="w-full h-auto object-contain" />
      </div>
    </div>
  )
}
