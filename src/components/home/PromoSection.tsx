const PromoSection = () => {
    return (
        <section className="py-12 md:py-24 flex justify-center bg-white">
            <div className="w-full max-w-[1440px] px-6 lg:px-[124px]">
                <div className="bg-primary flex flex-col md:flex-row relative overflow-hidden h-auto md:h-[400px] md:[clip-path:polygon(120px_0,100%_0,100%_calc(100%-120px),calc(100%-120px)_100%,0_100%,0_120px)] rounded-xl md:rounded-none">
                    <div className="p-8 md:p-16 md:w-[50%] flex flex-col justify-center relative z-20 md:mt-0">
                        <h2 className="text-white text-[40px] md:text-[52px] font-bold font-['Epilogue'] leading-[1.1] mb-4">Start posting<br />jobs today</h2>
                        <p className="text-white text-[16px] md:text-[18px] font-['Inter'] opacity-90 mb-8">Start posting jobs for only $10.</p>
                        <button className="bg-white text-primary text-[16px] font-bold px-[32px] py-[16px] w-[200px] hover:bg-gray-100 transition-all font-['Inter'] rounded-[0px]">
                            Sign Up For Free
                        </button>
                    </div>
                    <div className="md:block absolute right-0 lg:right-[-50px] top-[40px] w-full md:w-[700px] h-[800px] z-10 pointer-events-none opacity-20 md:opacity-100 mix-blend-overlay md:mix-blend-normal hidden">
                        <img src="/dashboard-mockup.png" alt="Dashboard" className="w-full h-auto rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] object-cover object-left-top" />
                    </div>
                    <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 40%)' }}></div>
                </div>
            </div>
        </section>
    );
};

export default PromoSection;
