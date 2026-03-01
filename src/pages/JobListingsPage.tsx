import { Briefcase, MapPin, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import JobCard from '../components/JobCard'
import JobCardSkeleton from '../components/JobCardSkeleton'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchJobs } from '../redux/slices/jobSlice'
import type { JobQueryParams } from '../types'

const categoriesList = [
    { name: 'All Categories', value: '' },
    { name: 'Design', value: 'Design' },
    { name: 'Sales', value: 'Sales' },
    { name: 'Marketing', value: 'Marketing' },
    { name: 'Finance', value: 'Finance' },
    { name: 'Technology', value: 'Technology' },
    { name: 'Engineering', value: 'Engineering' },
    { name: 'Business', value: 'Business' },
    { name: 'Human Resource', value: 'Human Resource' },
];

const JobListingsPage = () => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    const { jobs, loading, error } = useAppSelector((state) => state.jobs)

    const [titleSearch, setTitleSearch] = useState(searchParams.get('title') || '')
    const [locationSearch, setLocationSearch] = useState(searchParams.get('location') || '')
    const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '')

    useEffect(() => {
        const params: JobQueryParams = {}
        const title = searchParams.get('title')
        const location = searchParams.get('location')
        const category = searchParams.get('category')

        if (title) params.title = title
        if (location) params.location = location
        if (category) params.category = category

        dispatch(fetchJobs(params))
    }, [dispatch, searchParams])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (titleSearch) params.set('title', titleSearch)
        if (locationSearch) params.set('location', locationSearch)
        if (categoryFilter) params.set('category', categoryFilter)
        setSearchParams(params)
    }

    return (
        <div className="bg-[#F8F8FD] min-h-screen py-16">
            <div className="container mx-auto px-6 max-w-[1440px]">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold font-['Epilogue'] tracking-tight text-dark mb-4">Find your <span className="text-[#26A4FF]">dream job</span></h1>
                    <p className="text-[#515B6F] font-['Inter'] text-[18px]">Search through thousands of open roles across top companies.</p>
                </div>

                <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-[0px] mb-12">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-bold text-dark mb-2 font-['Inter']">Job Title</label>
                            <div className="relative border-b-2 border-gray-200 focus-within:border-primary transition-colors flex items-center">
                                <Search className="text-muted mr-3 mb-2" size={20} />
                                <input
                                    type="text"
                                    placeholder="e.g. UX Designer"
                                    className="w-full bg-transparent outline-none pb-2 text-[16px] font-['Inter'] text-dark"
                                    value={titleSearch}
                                    onChange={(e) => setTitleSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <label className="block text-sm font-bold text-dark mb-2 font-['Inter']">Location</label>
                            <div className="relative border-b-2 border-gray-200 focus-within:border-primary transition-colors flex items-center">
                                <MapPin className="text-muted mr-3 mb-2" size={20} />
                                <input
                                    type="text"
                                    placeholder="e.g. Florence, Italy"
                                    className="w-full bg-transparent outline-none pb-2 text-[16px] font-['Inter'] text-dark"
                                    value={locationSearch}
                                    onChange={(e) => setLocationSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <label className="block text-sm font-bold text-dark mb-2 font-['Inter']">Category</label>
                            <div className="relative border-b-2 border-gray-200 focus-within:border-primary transition-colors flex items-center">
                                <Briefcase className="text-muted mr-3 mb-2" size={20} />
                                <select
                                    className="w-full bg-transparent outline-none pb-2 text-[16px] font-['Inter'] text-dark appearance-none"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    {categoriesList.map((cat) => (
                                        <option key={cat.value} value={cat.value}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="bg-primary text-white font-bold h-[52px] px-10 hover:bg-primary/90 transition-colors font-['Inter']">
                            Search
                        </button>
                    </form>
                </div>

                {loading ? (
                    <div>
                        <div className="mb-6 flex justify-between items-center font-['Inter'] text-[#515B6F]">
                            <div className="h-5 w-36 rounded-full bg-slate-100 animate-pulse" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <JobCardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 font-['Inter'] text-red-500 text-xl">Error: {error.message || 'Failed to load jobs'}</div>
                ) : (
                    <div>
                        <div className="mb-6 flex justify-between items-center font-['Inter'] text-[#515B6F]">
                            <p>Showing <strong className="text-dark">{jobs.length}</strong> jobs</p>
                        </div>

                        {jobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {jobs.map((job, index) => (
                                    <JobCard key={job._id || `${job.title}-${index}`} job={job} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white border border-gray-100 p-8 rounded-[0px]">
                                <h3 className="text-2xl font-bold text-dark mb-2 font-['Epilogue']">No jobs found</h3>
                                <p className="text-muted font-['Inter']">Try adjusting your search or filters to find what you're looking for.</p>
                                <button
                                    onClick={() => {
                                        setSearchParams({});
                                        setTitleSearch('');
                                        setLocationSearch('');
                                        setCategoryFilter('');
                                    }}
                                    className="mt-6 border border-primary text-primary px-6 py-2 font-bold hover:bg-primary/5 transition-colors"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobListingsPage
