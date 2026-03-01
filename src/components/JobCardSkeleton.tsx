const JobCardSkeleton = () => {
    return (
        <div className="animate-pulse bg-white border border-border p-6 rounded-[0px]">
            <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-slate-100" />
                <div className="h-8 w-24 rounded-full bg-slate-100" />
            </div>
            <div className="h-6 w-3/4 rounded-full bg-slate-100" />
            <div className="mt-3 h-4 w-2/3 rounded-full bg-slate-100" />
            <div className="mt-5 space-y-2">
                <div className="h-4 w-full rounded-full bg-slate-100" />
                <div className="h-4 w-5/6 rounded-full bg-slate-100" />
            </div>
            <div className="mt-6 flex gap-2">
                <div className="h-8 w-24 rounded-full bg-slate-100" />
                <div className="h-8 w-20 rounded-full bg-slate-100" />
            </div>
        </div>
    );
};

export default JobCardSkeleton;
