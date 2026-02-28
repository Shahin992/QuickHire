import { ArrowRight } from 'lucide-react';
import LatestJobSkeleton from '../LatestJobSkeleton';
import CompanyLogo from '../CompanyLogo';

const LatestJobsSection = ({ latestJobs, loading }) => {
    const getTagStyles = (text) => {
        const lower = (text || '').toLowerCase();

        if (lower.includes('full-time') || lower.includes('full time')) {
            return 'border border-transparent bg-[#E7F6EA] text-[#56CDAD]';
        }

        if (lower.includes('marketing')) {
            return 'border border-[#FFB836] bg-white text-[#FFB836]';
        }

        if (lower.includes('design')) {
            return 'border border-[#4640DE] bg-white text-[#4640DE]';
        }

        return 'border border-[#D6DDEB] bg-white text-[#515B6F]';
    };

    return (
        <section className="py-12 md:py-24 flex justify-center bg-[#F8F8FD]">
            <div className="w-full max-w-[1440px] px-6 lg:px-[124px]">
                <div className="flex justify-between items-end mb-8 md:mb-12">
                    <div className="font-['Epilogue']">
                        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-dark tracking-tight">Latest <span className="text-secondary">jobs open</span></h2>
                    </div>
                    <button className="hidden md:flex text-primary font-bold items-center gap-2 font-['Inter'] text-[16px]">Show all jobs <ArrowRight size={20} /></button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                    {loading
                        ? Array.from({ length: 8 }).map((_, index) => <LatestJobSkeleton key={index} />)
                        : latestJobs.map((job, idx) => (
                            <div key={idx} className="bg-white border border-[#E4E7EC] px-8 py-7 rounded-[0px] hover:shadow-[0_18px_40px_rgba(37,50,75,0.08)] transition-all flex items-start gap-5 cursor-pointer group min-h-[120px]">
                                <CompanyLogo companyName={job.companyName} className="h-12 w-12 text-[22px]" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[20px] font-bold text-dark group-hover:text-primary transition-colors font-['Epilogue'] leading-[1.2] mb-2">
                                        {job.title}
                                    </h3>
                                    <p className="text-[#7C8493] text-[16px] font-['Inter'] leading-none">
                                        {job.companyName} <span className="mx-1.5">•</span> {job.location}
                                    </p>
                                    <div className="mt-4 flex gap-2 flex-wrap">
                                        <span className={`px-4 py-1.5 rounded-[100px] text-[14px] font-semibold leading-none ${getTagStyles(job.jobType)}`}>
                                            {job.jobType || 'Full-Time'}
                                        </span>
                                        <span className={`px-4 py-1.5 rounded-[100px] text-[14px] font-semibold leading-none ${getTagStyles(job.category)}`}>
                                            {job.category}
                                        </span>
                                        {job.tag2 && (
                                            <span className={`px-4 py-1.5 rounded-[100px] text-[14px] font-semibold leading-none ${getTagStyles(job.tag2)}`}>
                                                {job.tag2}
                                            </span>
                                        )}
                                    </div>
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

export default LatestJobsSection;
