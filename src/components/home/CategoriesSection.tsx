import { ArrowRight, Monitor, PenTool, BarChart, Megaphone, Wallet, Code, Briefcase, Users } from 'lucide-react';

const CategoriesSection = () => {
    const categories = [
        { name: 'Design', icon: <PenTool size={32} strokeWidth={1.5} />, count: 235 },
        { name: 'Sales', icon: <BarChart size={32} strokeWidth={1.5} />, count: 756 },
        { name: 'Marketing', icon: <Megaphone size={32} strokeWidth={1.5} />, count: 140, active: true },
        { name: 'Finance', icon: <Wallet size={32} strokeWidth={1.5} />, count: 325 },
        { name: 'Technology', icon: <Monitor size={32} strokeWidth={1.5} />, count: 436 },
        { name: 'Engineering', icon: <Code size={32} strokeWidth={1.5} />, count: 542 },
        { name: 'Business', icon: <Briefcase size={32} strokeWidth={1.5} />, count: 211 },
        { name: 'Human Resource', icon: <Users size={32} strokeWidth={1.5} />, count: 346 },
    ];

    return (
        <section className="py-12 md:py-24 bg-white flex justify-center">
            <div className="w-full max-w-[1440px] px-6 lg:px-[124px]">
                <div className="flex justify-between items-end mb-8 md:mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-dark font-['Epilogue'] tracking-tight">Explore by <span className="text-secondary">category</span></h2>
                    <button className="hidden md:flex text-primary font-bold items-center gap-2 font-['Inter'] text-[16px]">Show all jobs <ArrowRight size={20} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <div key={idx} className={`border border-border p-8 rounded-[0px] transition-all group cursor-pointer flex flex-col items-start gap-4 ${cat.active ? 'bg-primary text-white border-primary' : 'hover:bg-primary hover:text-white hover:border-primary text-dark bg-white'}`}>
                            <div className={`text-4xl mb-4 transition-transform p-3 rounded-[0px] ${cat.active ? 'text-white' : 'text-primary group-hover:text-white'}`}>
                                {cat.icon}
                            </div>
                            <div className="mt-2 text-left w-full">
                                <h3 className="text-[24px] font-bold mb-3 font-['Epilogue'] tracking-tight leading-[1]">{cat.name}</h3>
                                <p className={`font-['Inter'] text-[16px] ${cat.active ? 'text-white opacity-80' : 'text-muted group-hover:text-white group-hover:opacity-80 flex items-center gap-2'}`}>
                                    {cat.count} jobs available <ArrowRight size={18} className="inline ml-1" />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 md:hidden">
                    <button className="text-primary font-bold flex items-center gap-2 font-['Inter'] text-[16px]">Show all jobs <ArrowRight size={20} /></button>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
