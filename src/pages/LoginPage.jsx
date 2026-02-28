import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { login, clearAuthError } from '../redux/slices/authSlice';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { userInfo, loading, error } = useSelector((state) => state.auth);
    const successMessage = location.state?.message;

    useEffect(() => {
        if (userInfo) {
            navigate(userInfo.isAdmin ? '/admin' : '/');
        }
        return () => {
            dispatch(clearAuthError());
        };
    }, [navigate, userInfo, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(70,64,222,0.14),_transparent_28%),linear-gradient(180deg,_#f7f8fc_0%,_#eef2f9_100%)] px-6 py-16">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[32px] bg-[#14213d] px-8 py-10 text-white shadow-[0_30px_80px_rgba(20,33,61,0.22)] sm:px-10 sm:py-12">
                    <div className="mb-10 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-medium tracking-[0.18em] uppercase">
                        QTEC Careers
                    </div>
                    <h1 className="max-w-md font-['Epilogue'] text-4xl font-semibold leading-tight sm:text-5xl">
                        Welcome back
                    </h1>
                    <p className="mt-5 max-w-lg font-['Inter'] text-base leading-7 text-white/72 sm:text-lg">
                        Sign in to manage your applications, track openings, and access the admin dashboard when permitted.
                    </p>
                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                            <p className="font-['Epilogue'] text-2xl font-semibold">Fast</p>
                            <p className="mt-2 font-['Inter'] text-sm leading-6 text-white/70">A clean auth flow with no extra steps.</p>
                        </div>
                        <div className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                            <p className="font-['Epilogue'] text-2xl font-semibold">Focused</p>
                            <p className="mt-2 font-['Inter'] text-sm leading-6 text-white/70">Minimal UI that keeps attention on the form.</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10">
                    <div className="mb-8">
                        <p className="font-['Inter'] text-sm font-medium uppercase tracking-[0.22em] text-[#4640DE]">Sign in</p>
                        <h2 className="mt-3 font-['Epilogue'] text-3xl font-semibold text-dark">Access your account</h2>
                        <p className="mt-3 font-['Inter'] text-[15px] leading-7 text-[#667085]">
                            Use your email and password to continue.
                        </p>
                    </div>

                    {successMessage && (
                        <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-['Inter'] text-sm text-emerald-700">
                            {successMessage}
                        </div>
                    )}

                    {error && (
                        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-['Inter'] text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block font-['Inter'] text-sm font-semibold text-dark">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full rounded-2xl border border-[#D7DEEA] bg-[#FCFDFF] px-4 py-3.5 font-['Inter'] text-[16px] text-dark outline-none transition focus:border-primary focus:ring-4 focus:ring-[#4640DE]/10"
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl bg-[#14213d] px-4 py-3.5 font-['Inter'] text-[16px] font-semibold text-white transition hover:bg-[#0f1a32] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className="mt-6 font-['Inter'] text-sm text-[#667085]">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="font-semibold text-[#4640DE] transition hover:text-[#2f2ab8]">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
