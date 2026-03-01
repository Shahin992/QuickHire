import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchJobById } from '../redux/slices/jobSlice'
import { applicationService } from '../services/api'
import type { ApplicationPayload } from '../types'

const ApplyJobPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { currentJob } = useAppSelector((state) => state.jobs)

    const [formData, setFormData] = useState<ApplicationPayload>({
        name: '',
        email: '',
        resumeLink: '',
        coverLetter: '',
    })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (id && (!currentJob || currentJob._id !== id)) {
            dispatch(fetchJobById(id))
        }
    }, [dispatch, id, currentJob])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!id) return

        setSubmitting(true)
        try {
            await applicationService.submitApplication({
                ...formData,
                job: id,
            })
            setSubmitted(true)
        } catch (error: any) {
            alert(`Failed to submit application: ${error.response?.data?.message || error.message}`)
        } finally {
            setSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <div className="max-w-md mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                    <CheckCircle2 className="text-green-500 mx-auto mb-6" size={64} />
                    <h1 className="text-3xl font-bold mb-4">Application Sent!</h1>
                    <p className="text-muted mb-10">Your application for {currentJob?.title} has been submitted successfully.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary text-white px-10 py-4 rounded-lg font-bold w-full"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-6 py-12 max-w-2xl">
            <Link to={`/job/${id}`} className="flex items-center gap-2 text-primary font-bold mb-8">
                <ArrowLeft size={20} /> Back to job details
            </Link>

            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
                <h1 className="text-3xl font-bold mb-2">Apply for this position</h1>
                <p className="text-muted mb-10">Position: <span className="text-dark font-bold">{currentJob?.title}</span></p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-200 p-4 rounded-lg outline-none focus:border-primary"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full border border-gray-200 p-4 rounded-lg outline-none focus:border-primary"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Resume Link (Google Drive / Dropbox)</label>
                        <input
                            type="url"
                            required
                            className="w-full border border-gray-200 p-4 rounded-lg outline-none focus:border-primary"
                            placeholder="https://drive.google.com/..."
                            value={formData.resumeLink}
                            onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Cover Letter</label>
                        <textarea
                            required
                            rows={6}
                            className="w-full border border-gray-200 p-4 rounded-lg outline-none focus:border-primary"
                            placeholder="Explain why you are the best fit for this role..."
                            value={formData.coverLetter}
                            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary text-white w-full py-4 rounded-lg font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                        {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ApplyJobPage
