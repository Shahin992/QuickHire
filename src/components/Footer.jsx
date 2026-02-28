import { Facebook, Instagram, Dribbble, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#202430] text-white pt-16 md:pt-24 pb-12">
            <div className="w-full max-w-[1440px] px-6 lg:px-[124px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
                <div className="col-span-1">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">Q</span>
                        </div>
                        <h2 className="text-[24px] font-bold font-['Epilogue'] tracking-tight">QuickHire</h2>
                    </div>
                    <p className="text-[#A8ADB7] text-[16px] leading-[1.6] mb-8 font-['Inter']">
                        Great platform for the job seeker that passionate about startups. Find your dream job easier.
                    </p>
                </div>
                <div>
                    <h3 className="text-[18px] font-bold mb-8 font-['Epilogue'] tracking-tight">About</h3>
                    <ul className="space-y-4 text-[#A8ADB7] text-[16px] font-['Inter']">
                        <li className="hover:text-white cursor-pointer transition-colors">Companies</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Advice</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-[18px] font-bold mb-8 font-['Epilogue'] tracking-tight">Resources</h3>
                    <ul className="space-y-4 text-[#A8ADB7] text-[16px] font-['Inter']">
                        <li className="hover:text-white cursor-pointer transition-colors">Help Docs</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Guide</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Updates</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-[18px] font-bold mb-8 font-['Epilogue'] tracking-tight">Get job notifications</h3>
                    <p className="text-[#A8ADB7] text-[16px] mb-6 font-['Inter'] leading-[1.6]">The latest job news, articles, sent to your inbox weekly.</p>
                    <div className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="bg-white border-none px-4 py-3 w-full rounded focus:ring-1 focus:ring-primary outline-none text-[#25324B] placeholder:text-[#A8ADB7] font-['Inter']"
                        />
                        <button className="bg-primary px-6 py-3 rounded font-bold hover:bg-primary/90 transition-all font-['Inter'] self-start">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[1440px] px-6 lg:px-[124px] mx-auto mt-16 md:mt-24 pt-8 md:pt-10 border-t border-[#2D3241] text-[#A8ADB7] text-[16px] flex flex-col md:flex-row justify-between items-center gap-6 font-['Inter']">
                <p className="text-center md:text-left">2026 @ QuickHire. All rights reserved.</p>
                <div className="flex gap-4">
                    <a className="w-10 h-10 rounded-full bg-[#2D3241] flex items-center justify-center hover:bg-primary text-white cursor-pointer transition-colors">
                        <Facebook size={18} fill="currentColor" stroke="none" />
                    </a>
                    <a className="w-10 h-10 rounded-full bg-[#2D3241] flex items-center justify-center hover:bg-primary text-white cursor-pointer transition-colors">
                        <Instagram size={18} />
                    </a>
                    <a className="w-10 h-10 rounded-full bg-[#2D3241] flex items-center justify-center hover:bg-primary text-white cursor-pointer transition-colors">
                        <Dribbble size={18} />
                    </a>
                    <a className="w-10 h-10 rounded-full bg-[#2D3241] flex items-center justify-center hover:bg-primary text-white cursor-pointer transition-colors">
                        <Linkedin size={18} fill="currentColor" stroke="none" />
                    </a>
                    <a className="w-10 h-10 rounded-full bg-[#2D3241] flex items-center justify-center hover:bg-primary text-white cursor-pointer transition-colors">
                        <Twitter size={18} fill="currentColor" stroke="none" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
