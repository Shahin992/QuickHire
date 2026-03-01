import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { clearAuthError, register } from '../redux/slices/authSlice'

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [localError, setLocalError] = useState('')

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { userInfo, loading, error: reduxError } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate(userInfo.isAdmin ? '/admin' : '/')
        }

        return () => {
            dispatch(clearAuthError())
        }
    }, [navigate, userInfo, dispatch])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLocalError('')

        if (password !== confirmPassword) {
            setLocalError('Passwords do not match')
            return
        }

        try {
            await dispatch(register({ name, email, password })).unwrap()
            navigate('/login', {
                replace: true,
                state: {
                    message: 'Account created successfully. Please log in.',
                },
            })
        } catch {}
    }

    const error = localError || reduxError

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(20,33,61,0.12),_transparent_26%),linear-gradient(180deg,_#f7f8fc_0%,_#eef2f9_100%)] px-6 py-16">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10 lg:order-2">
                    <div className="mb-8">
                        <p className="font-['Inter'] text-sm font-medium uppercase tracking-[0.22em] text-[#4640DE]">Create account</p>
                        <h1 className="mt-3 font-['Epilogue'] text-3xl font-semibold text-dark">Start with a clean profile</h1>
                        <p className="mt-3 font-['Inter'] text-[15px] leading-7 text-[#667085]">
                            Set up your account and continue to login once registration is complete.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-['Inter'] text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block font-['Inter'] text-sm font-semibold text-dark">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full rounded-2xl border border-[#D7DEEA] bg-[#FCFDFF] px-4 py-3.5 font-['Inter'] text-[16px] text-dark outline-none transition focus:border-primary focus:ring-4 focus:ring-[#4640DE]/10"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block font-['Inter'] text-sm font-semibold text-dark">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full rounded-2xl border border-[#D7DEEA] bg-[#FCFDFF] px-4 py-3.5 font-['Inter'] text-[16px] text-dark outline-none transition focus:border-primary focus:ring-4 focus:ring-[#4640DE]/10"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block font-['Inter'] text-sm font-semibold text-dark">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full rounded-2xl border border-[#D7DEEA] bg-[#FCFDFF] px-4 py-3.5 font-['Inter'] text-[16px] text-dark outline-none transition focus:border-primary focus:ring-4 focus:ring-[#4640DE]/10"
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block font-['Inter'] text-sm font-semibold text-dark">Confirm Password</label>
                            <input
                                type="password"
                                required
                                className="w-full rounded-2xl border border-[#D7DEEA] bg-[#FCFDFF] px-4 py-3.5 font-['Inter'] text-[16px] text-dark outline-none transition focus:border-primary focus:ring-4 focus:ring-[#4640DE]/10"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl bg-[#14213d] px-4 py-3.5 font-['Inter'] text-[16px] font-semibold text-white transition hover:bg-[#0f1a32] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="mt-6 font-['Inter'] text-sm text-[#667085]">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-[#4640DE] transition hover:text-[#2f2ab8]">
                            Login
                        </Link>
                    </p>
                </div>

                <div className="rounded-[32px] bg-[#14213d] px-8 py-10 text-white shadow-[0_30px_80px_rgba(20,33,61,0.22)] sm:px-10 sm:py-12 lg:order-1">
                    <div className="mb-10 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-medium tracking-[0.18em] uppercase">
                        QTEC Careers
                    </div>
                    <h2 className="max-w-md font-['Epilogue'] text-4xl font-semibold leading-tight sm:text-5xl">
                        Minimal signup, clearer next step
                    </h2>
                    <p className="mt-5 max-w-lg font-['Inter'] text-base leading-7 text-white/72 sm:text-lg">
                        Registration completes the account setup only. After success, users are redirected to login instead of being sent to the homepage.
                    </p>
                    <div className="mt-10 space-y-4">
                        <div className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                            <p className="font-['Epilogue'] text-xl font-semibold">1. Create account</p>
                            <p className="mt-2 font-['Inter'] text-sm leading-6 text-white/70">Add your basic details with password confirmation.</p>
                        </div>
                        <div className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                            <p className="font-['Epilogue'] text-xl font-semibold">2. Login next</p>
                            <p className="mt-2 font-['Inter'] text-sm leading-6 text-white/70">Use the new account on the login page after a successful signup.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
