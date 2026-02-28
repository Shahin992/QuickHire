import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { Menu } from 'lucide-react';

const Navbar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="bg-[#F8F8FD] h-[80px] flex items-center justify-center sticky top-0 z-50">
            <div className="w-full max-w-[1440px] px-6 lg:px-[124px] flex justify-between items-center">
                <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
                    <Link to="/" className="flex items-center gap-3 mr-0 md:mr-[48px] font-['Epilogue']">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="12" stroke="#4640DE" strokeWidth="4.5" />
                            <circle cx="16" cy="16" r="4" fill="#4640DE" />
                        </svg>
                        <span className="text-[24px] font-bold text-[#25324B] tracking-tight">QuickHire</span>
                    </Link>

                    <div className="md:hidden flex items-center cursor-pointer">
                        <Menu className="text-[#25324B]" size={28} />
                    </div>

                    <div className="hidden md:flex gap-[32px] font-['Inter'] font-medium">
                        <Link to="/jobs" className="text-[16px] text-[#515B6F] hover:text-primary transition-colors">Find Jobs</Link>
                        <Link to="/" className="text-[16px] text-[#515B6F] hover:text-primary transition-colors">Browse Companies</Link>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-[32px] font-['Inter']">
                    {userInfo ? (
                        <>
                            <span className="text-[#515B6F] font-medium hidden md:block">Hello, {userInfo.name.split(' ')[0]}</span>
                            {userInfo.isAdmin && (
                                <Link to="/admin" className="text-[#4640DE] font-bold text-[16px] hover:underline">Dashboard</Link>
                            )}
                            <button onClick={handleLogout} className="text-[#4640DE] font-bold text-[16px] whitespace-nowrap">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-[#4640DE] font-bold text-[16px] whitespace-nowrap">Login</Link>
                            <Link to="/register" className="bg-[#4640DE] text-white font-bold text-[16px] px-[24px] py-[12px] rounded-[0px] whitespace-nowrap transition-all hover:bg-primary/90">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
