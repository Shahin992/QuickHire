const JobDetailsSkeleton = () => {
    return (
        <div className="container mx-auto max-w-4xl px-6 py-12 animate-pulse">
            <div className="mb-8 h-5 w-32 rounded-full bg-slate-100" />
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-6">
                        <div className="h-20 w-20 rounded-2xl bg-slate-100" />
                        <div className="space-y-3">
                            <div className="h-8 w-64 rounded-full bg-slate-100" />
                            <div className="h-5 w-48 rounded-full bg-slate-100" />
                        </div>
                    </div>
                    <div className="h-14 w-full rounded-lg bg-slate-100 md:w-36" />
                </div>

                <div className="mb-10 grid grid-cols-1 gap-6 border-y border-gray-50 py-6 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-slate-100" />
                            <div className="space-y-2">
                                <div className="h-3 w-20 rounded-full bg-slate-100" />
                                <div className="h-5 w-24 rounded-full bg-slate-100" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-12 border-b border-gray-100 pb-12">
                    <div className="mb-4 h-7 w-40 rounded-full bg-slate-100" />
                    <div className="space-y-3">
                        <div className="h-4 w-full rounded-full bg-slate-100" />
                        <div className="h-4 w-full rounded-full bg-slate-100" />
                        <div className="h-4 w-11/12 rounded-full bg-slate-100" />
                        <div className="h-4 w-4/5 rounded-full bg-slate-100" />
                    </div>
                </div>

                <div className="mx-auto max-w-2xl pt-6">
                    <div className="mb-6 h-8 w-56 rounded-full bg-slate-100" />
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="h-4 w-24 rounded-full bg-slate-100" />
                            <div className="h-14 w-full rounded-[0px] bg-slate-100" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-28 rounded-full bg-slate-100" />
                            <div className="h-14 w-full rounded-[0px] bg-slate-100" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-32 rounded-full bg-slate-100" />
                            <div className="h-14 w-full rounded-[0px] bg-slate-100" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-28 rounded-full bg-slate-100" />
                            <div className="h-36 w-full rounded-[0px] bg-slate-100" />
                        </div>
                        <div className="h-14 w-full rounded-[0px] bg-slate-100" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsSkeleton;
