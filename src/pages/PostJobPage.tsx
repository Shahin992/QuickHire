import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { jobService } from '../services/api'
import type { Job } from '../types'

const PostJobPage = () => {
    const navigate = useNavigate()
    const { userInfo } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    const [formData, setFormData] = useState<Omit<Job, '_id' | 'tag2'>>({
        title: '',
        companyName: '',
        location: '',
        jobType: 'Full-time',
        salary: '',
        category: 'Engineering',
        description: '',
    })
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            await jobService.createJob(formData)
            navigate('/admin')
        } catch (error: any) {
            alert(`Failed to post job: ${error.response?.data?.message || error.message}`)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="container mx-auto px-6 py-12 max-w-2xl">
            <Link to="/admin" className="flex items-center gap-2 text-primary font-bold mb-8">
                <ArrowLeft size={20} /> Back to dashboard
            </Link>

            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
                <h1 className="text-3xl font-bold mb-10">Post a new job listing</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Job Title</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-gray-200 p-4 rounded-lg outline-none focus:border-primary"
                                placeholder="Software Engineer"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Company Name</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-gray-200 p-4 rounded-lg outline-none focus:border-primary"
                                placeholder="Tech Solutions"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Location</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-gray-200 p-4 rounded-lg outline-none focus:border-primary"
                                placeholder="Dhaka, Bangladesh"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Salary Range</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-gray-200 p-4 rounded-lg outline-none focus:border-primary"
                                placeholder="$1000 - $2000"
                                value={formData.salary}
                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Job Type</label>
                            <select
                                className="w-full border border-gray-200 p-4 rounded-lg outline-none focus:border-primary appearance-none bg-white"
                                value={formData.jobType}
                                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                            >
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>Freelance</option>
                                <option>Internship</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Category</label>
                            <select
                                className="w-full border border-gray-200 p-4 rounded-lg outline-none focus:border-primary appearance-none bg-white"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Engineering</option>
                                <option>Design</option>
                                <option>Marketing</option>
                                <option>Sales</option>
                                <option>Finance</option>
                                <option>Business</option>
                                <option>Human Resource</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Job Description</label>
                        <textarea
                            required
                            rows={6}
                            className="w-full border border-gray-200 p-4 rounded-lg outline-none focus:border-primary"
                            placeholder="Enter detailed job requirements and responsibilities..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary text-white w-full py-4 rounded-lg font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                        {submitting ? 'Posting...' : 'Post Job'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PostJobPage
