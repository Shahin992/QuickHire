import { useNavigate } from 'react-router-dom'
import type { Job } from '../types'
import CompanyLogo from './CompanyLogo'

interface JobCardProps {
    job: Job
}

const JobCard = ({ job }: JobCardProps) => {
    const navigate = useNavigate()

    const getTagStyles = (text: string) => {
        const lower = (text || '').toLowerCase()
        if (lower.includes('full-time') || lower.includes('full time')) {
            return 'border border-primary text-primary bg-white'
        }
        if (lower.includes('marketing')) return 'bg-[#FFF2E7] text-[#EB8533] border-transparent'
        if (lower.includes('design')) return 'bg-[#E7F6EA] text-[#0E9347] border-transparent'
        if (lower.includes('business')) return 'bg-[#EBEBFF] text-primary border-transparent'
        if (lower.includes('technology')) return 'bg-[#FEEBEB] text-[#FF6550] border-transparent'
        return 'bg-gray-100 text-gray-600 border-transparent'
    }

    const handleCardClick = () => {
        if (job?._id) {
            navigate(`/job/${job._id}`)
        }
    }

    return (
        <div
            className="bg-white border border-border p-6 rounded-[0px] transition-all flex flex-col justify-between h-full hover:shadow-lg group cursor-pointer"
            onClick={handleCardClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick()
                }
            }}
            role="link"
            tabIndex={0}
        >
            <div>
                <div className="flex justify-between items-start mb-4">
                    <CompanyLogo companyName={job.companyName} className="h-12 w-12 text-[22px]" />
                    <span className={`job-tag px-3 py-1 text-[14px] font-semibold border ${getTagStyles(job.jobType)}`}>
                        {job.jobType || 'Full Time'}
                    </span>
                </div>
                <h3 className="text-[18px] font-bold mb-1 text-dark group-hover:text-primary transition-colors font-['Epilogue']">{job.title}</h3>
                <p className="text-[#7C8493] text-[16px] mb-4 font-['Inter']">
                    {job.companyName} <span className="mx-1">•</span> {job.location}
                </p>
                <p className="text-muted text-[15px] font-['Inter'] mb-6 line-clamp-2 leading-[1.6]">
                    {job.companyName} is looking for {job.title} to help team design ...
                </p>
                <div className="flex gap-2 mb-2 flex-wrap font-['Inter']">
                    <span className={`job-tag px-4 py-1.5 rounded-full text-[14px] font-semibold ${getTagStyles(job.category)}`}>
                        {job.category}
                    </span>
                    {job.tag2 && (
                        <span className={`job-tag px-4 py-1.5 rounded-full text-[14px] font-semibold ${getTagStyles(job.tag2)}`}>
                            {job.tag2}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default JobCard
