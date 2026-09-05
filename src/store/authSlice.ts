import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import usersData from '../data/users.json'
import type { User, AuthState } from '../types'

const STORAGE_KEY = 'proshop_user'

function loadUser(): User | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : null
}

const initialState: AuthState = {
  user: loadUser(),
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const match = usersData.find(
        (u) => u.email === action.payload.email && u.password === action.payload.password
      )
      if (!match) {
        state.error = 'Invalid email or password'
        return
      }
      const user: User = { id: match.id, name: match.name, email: match.email, isAdmin: match.isAdmin }
      state.user = user
      state.error = null
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    },
    register(state, action: PayloadAction<{ name: string; email: string; password: string }>) {
      const exists = usersData.some((u) => u.email === action.payload.email)
      if (exists) {
        state.error = 'Email already registered'
        return
      }
      const user: User = {
        id: `u${Date.now()}`,
        name: action.payload.name,
        email: action.payload.email,
        isAdmin: false,
      }
      state.user = user
      state.error = null
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    },
    logout(state) {
      state.user = null
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})

export const { login, register, logout } = authSlice.actions
export default authSlice.reducer
