import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';

const HeroSection = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        if (title) searchParams.append('title', title);
        if (location) searchParams.append('location', location);
        navigate(`/jobs?${searchParams.toString()}`);
    };

    return (
        <section className="bg-[#F8F8FD] pt-[40px] md:pt-[80px] pb-[80px] w-full flex justify-center z-10 relative overflow-hidden">
            <div className="w-full max-w-[1440px] px-6 lg:px-[124px] relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between w-full h-full relative">
                    <div className="lg:w-[60%] flex flex-col pt-12 pb-12 relative z-30">
                        <h1 className="text-[48px] lg:text-[72px] font-bold text-[#25324B] mb-6 leading-[1.05] font-['Epilogue'] tracking-tighter">
                            Discover <br />
                            more than <br />
                            <span className="text-[#38CBF3] relative inline-block">
                                5000+ Jobs
                                <svg className="absolute -bottom-1 lg:-bottom-2 -left-2 w-[110%] h-[16px] lg:h-[24px]" viewBox="0 0 358 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12C120 -2 250 -2 350 12" stroke="#38CBF3" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 22C110 12 240 12 330 20" stroke="#38CBF3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-[#515B6F] text-[18px] md:text-[20px] mb-12 max-w-[500px] leading-[1.6] font-['Inter']">
                            Great platform for the job seeker that searching for new career heights and passionate about startups.
                        </p>

                        <form onSubmit={handleSearch} className="bg-white search-shadow flex flex-col md:flex-row items-stretch w-full max-w-[850px] relative z-20 overflow-hidden">

                            <div className="flex items-center gap-3 px-4 md:px-6 py-[16px] md:py-[22px] flex-1 bg-transparent">
                                <Search className="text-[#25324B]" size={22} strokeWidth={2.5} />
                                <input
                                    type="text"
                                    placeholder="Job title or keyword"
                                    className="w-full text-[16px] outline-none font-medium placeholder:text-[#A8ADB7] text-[#25324B] bg-transparent"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="hidden md:block w-[1px] h-[40px] bg-border opacity-60 self-center"></div>
                            <div className="block md:hidden w-full h-[1px] bg-border opacity-20"></div>

                            <div className="flex items-center gap-3 px-4 md:px-6 py-[16px] md:py-[22px] flex-1 bg-transparent">
                                <MapPin className="text-[#25324B]" size={22} strokeWidth={2.5} />
                                <input
                                    type="text"
                                    placeholder="Florence, Italy"
                                    className="w-full text-[16px] outline-none font-medium placeholder:text-[#515B6F] text-[#25324B] bg-transparent"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <ChevronDown className="text-[#A8ADB7] cursor-pointer" size={20} />
                            </div>

                            <button type="submit" className="bg-[#4640DE] text-white text-[16px] md:text-[18px] font-bold px-[24px] md:px-[40px] h-[100%] self-stretch hover:bg-primary/90 transition-all font-['Inter'] min-h-[64px] md:min-h-[68px]">
                                Search my job
                            </button>
                        </form>

                        <p className="mt-8 text-[#515B6F] font-medium font-['Inter'] text-[14px] md:text-[16px]">
                            Popular : UI Designer, UX Researcher, Android, Admin
                        </p>
                    </div>

                    <div className="hidden lg:flex absolute right-0 bottom-0 z-10 pointer-events-none w-[55%] h-full">
                        <img
                            src="/hero-img.png"
                            alt="Job Seeker"
                            className="w-full h-full object-cover object-right-bottom"
                        />
                    </div>

                    <div className="hidden lg:block absolute right-0 bottom-0 w-[150px] h-[150px] bg-white z-20 pointer-events-none" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
