const CompaniesSection = () => {
    return (
        <section className="bg-white py-8 md:py-12 flex justify-center w-full">
            <div className="w-full max-w-[1440px] px-6 lg:px-[124px]">
                <p className="text-[#515B6F] font-['Inter'] text-[18px] mb-6 md:mb-8 text-center md:text-left">Companies we helped grow</p>
                <div className="flex justify-center md:justify-between items-center opacity-40 grayscale flex-wrap gap-8">
                    <div className="font-bold text-3xl font-['Epilogue'] tracking-tighter">vodafone</div>
                    <div className="font-bold text-3xl font-['Epilogue']">intel.</div>
                    <div className="font-bold text-3xl font-['Epilogue'] tracking-[0.2em]">TESLA</div>
                    <div className="font-bold text-3xl font-sans tracking-tight">AMD</div>
                    <div className="font-bold text-3xl font-serif">Talkit</div>
                </div>
            </div>
        </section>
    );
};

export default CompaniesSection;
