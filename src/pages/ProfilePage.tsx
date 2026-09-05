import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../store/authSlice'

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  if (!user) return null

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-16 flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-[280px] bg-surface rounded-card p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-5">
          <img src="/assets/profile-avatar.webp" alt={user.name} className="w-14 h-14 rounded-full object-cover border-2 border-brand" />
          <span className="font-sans font-bold text-[18px] text-ink">{user.name}</span>
        </div>
        <nav className="flex flex-col font-sans text-[15px] text-ink">
          <span className="py-2 cursor-default">My Orders</span>
          <span className="py-2 cursor-default">Wishlist</span>
          <span className="py-2 cursor-default">Notifications</span>
          <span className="py-2 border-b border-grey-300 pb-4 mb-2 cursor-default">Settings</span>
          <button onClick={() => dispatch(logout())} className="py-2 text-left">
            Logout
          </button>
        </nav>
      </div>

      <div className="w-full flex-1 bg-surface rounded-card p-8 flex flex-col sm:flex-row items-start sm:justify-between gap-8">
        <div className="flex-1">
          <h1 className="font-sans font-black text-[24px] text-ink mb-6">My Profile</h1>
          <div className="flex flex-col gap-4 max-w-[400px] mb-6">
            <div>
              <span className="block font-sans text-[14px] text-muted">Name</span>
              <span className="font-sans text-[16px] text-ink">{user.name}</span>
            </div>
            <div>
              <span className="block font-sans text-[14px] text-muted">Email</span>
              <span className="font-sans text-[16px] text-ink">{user.email}</span>
            </div>
          </div>
          <button className="h-10 px-4 bg-brand rounded-input font-sans font-bold text-[14px] text-ink">
            Change Password
          </button>
        </div>
        <div className="flex flex-col items-center gap-3 shrink-0">
          <img src="/assets/profile-avatar.webp" alt={user.name} className="w-24 h-24 rounded-full object-cover" />
          <button className="h-9 px-4 bg-brand rounded-input font-sans font-bold text-[13px] text-ink whitespace-nowrap">
            Upload new photo
          </button>
        </div>
      </div>
    </div>
  )
}
