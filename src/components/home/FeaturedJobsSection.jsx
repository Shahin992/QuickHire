import { ArrowRight } from 'lucide-react';
import JobCard from '../JobCard';
import JobCardSkeleton from '../JobCardSkeleton';

const FeaturedJobsSection = ({ featuredJobs, loading }) => {
    return (
        <section className="py-12 md:py-24 flex justify-center bg-white">
            <div className="w-full max-w-[1440px] px-6 lg:px-[124px]">
                <div className="flex justify-between items-end mb-8 md:mb-12">
                    <div className="font-['Epilogue']">
                        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-dark tracking-tight">Featured <span className="text-secondary">jobs</span></h2>
                        <p className="text-muted text-[16px] font-['Inter']">Know your worth and find the job that qualify your skills.</p>
                    </div>
                    <button className="hidden md:flex text-primary font-bold items-center gap-2 font-['Inter'] text-[16px]">Show all jobs <ArrowRight size={20} /></button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <JobCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredJobs.map((job) => (
                            <JobCard key={job._id || job.title + Math.random()} job={job} />
                        ))}
                    </div>
                )}
                <div className="mt-8 md:hidden">
                    <button className="text-primary font-bold flex items-center gap-2 font-['Inter'] text-[16px]">Show all jobs <ArrowRight size={20} /></button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedJobsSection;
