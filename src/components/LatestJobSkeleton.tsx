const LatestJobSkeleton = () => {
    return (
        <div className="animate-pulse bg-white border border-[#E4E7EC] px-8 py-7 rounded-[0px] flex items-start gap-5 min-h-[120px]">
            <div className="h-12 w-12 rounded-[0px] bg-slate-100 shrink-0" />
            <div className="flex-1 w-full">
                <div className="h-6 w-3/5 rounded-full bg-slate-100" />
                <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-100" />
                <div className="mt-4 flex gap-2 flex-wrap">
                    <div className="h-8 w-24 rounded-full bg-slate-100" />
                    <div className="h-8 w-28 rounded-full bg-slate-100" />
                    <div className="h-8 w-20 rounded-full bg-slate-100" />
                </div>
            </div>
        </div>
    );
};

export default LatestJobSkeleton;
