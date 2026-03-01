import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { authService } from '../../services/api'
import type { RegisterPayload, UserInfo } from '../../types'

interface AuthState {
  userInfo: UserInfo | null
  loading: boolean
  error: string | null
}

const getUserFromStorage = (): UserInfo | null => {
  const storedValue = localStorage.getItem('userInfo')

  if (!storedValue) {
    return null
  }

  try {
    return JSON.parse(storedValue) as UserInfo
  } catch {
    localStorage.removeItem('userInfo')
    return null
  }
}

const initialState: AuthState = {
  userInfo: getUserFromStorage(),
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(userData)
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  },
)

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo')
      state.userInfo = null
      state.error = null
    },
    clearAuthError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.loading = false
        state.userInfo = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Login failed'
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Registration failed'
      })
  },
})

export const { logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
