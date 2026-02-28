import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById, clearCurrentJob } from '../redux/slices/jobSlice';
import { applicationService } from '../services/api';
import { MapPin, Briefcase, DollarSign, ArrowLeft, CheckCircle2 } from 'lucide-react';
import JobDetailsSkeleton from '../components/JobDetailsSkeleton';

const JobDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentJob, loading, error } = useSelector((state) => state.jobs);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resumeLink: '',
        coverLetter: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(fetchJobById(id));
        return () => dispatch(clearCurrentJob());
    }, [dispatch, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await applicationService.submitApplication({
                ...formData,
                job: id,
            });
            setSubmitted(true);
        } catch (error) {
            alert('Failed to submit application: ' + (error.response?.data?.message || error.message));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <JobDetailsSkeleton />;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error.message || 'Job not found'}</div>;
    if (!currentJob) return null;

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <Link to="/" className="flex items-center gap-2 text-primary font-bold mb-8">
                <ArrowLeft size={20} /> Back to jobs
            </Link>

            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl">
                            🏢
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{currentJob.title}</h1>
                            <p className="text-muted text-lg">{currentJob.companyName} • {currentJob.location}</p>
                        </div>
                    </div>
                    <a
                        href="#apply-form"
                        className="bg-primary text-white px-10 py-4 rounded-lg font-bold w-full md:w-auto text-center hover:opacity-90 transition-opacity"
                    >
                        Apply Now
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 py-6 border-y border-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-full text-primary">
                            <Briefcase size={20} />
                        </div>
                        <div>
                            <p className="text-muted text-xs uppercase font-bold tracking-wider">Job Type</p>
                            <p className="font-bold">{currentJob.jobType}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-full text-primary">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-muted text-xs uppercase font-bold tracking-wider">Location</p>
                            <p className="font-bold">{currentJob.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-full text-primary">
                            <DollarSign size={20} />
                        </div>
                        <div>
                            <p className="text-muted text-xs uppercase font-bold tracking-wider">Salary</p>
                            <p className="font-bold text-green-600">{currentJob.salary}</p>
                        </div>
                    </div>
                </div>

                <div className="prose max-w-none mb-12 border-b border-gray-100 pb-12">
                    <h3 className="text-xl font-bold mb-4 font-['Epilogue']">Job Description</h3>
                    <p className="text-[#515B6F] font-['Inter'] leading-relaxed whitespace-pre-wrap">{currentJob.description}</p>
                </div>

                <div id="apply-form" className="max-w-2xl mx-auto pt-6">
                    <h3 className="text-2xl font-bold mb-6 font-['Epilogue']">Apply for this position</h3>
                    {submitted ? (
                        <div className="text-center py-10 bg-[#E7F6EA] rounded-xl border border-[#0E9347]/20">
                            <CheckCircle2 className="text-[#0E9347] mx-auto mb-4" size={48} />
                            <h4 className="text-xl font-bold text-[#0E9347] mb-2 font-['Epilogue']">Application Sent!</h4>
                            <p className="text-[#0E9347]/80 font-['Inter']">Thank you for applying. We will get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 font-['Inter']">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-dark">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border border-gray-200 p-4 rounded-[0px] outline-none focus:border-primary transition-colors text-[16px]"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-dark">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full border border-gray-200 p-4 rounded-[0px] outline-none focus:border-primary transition-colors text-[16px]"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-dark">Resume Link (URL) *</label>
                                <input
                                    type="url"
                                    required
                                    className="w-full border border-gray-200 p-4 rounded-[0px] outline-none focus:border-primary transition-colors text-[16px]"
                                    placeholder="https://drive.google.com/..."
                                    value={formData.resumeLink}
                                    onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-dark">Cover Note *</label>
                                <textarea
                                    required
                                    rows="6"
                                    className="w-full border border-gray-200 p-4 rounded-[0px] outline-none focus:border-primary transition-colors text-[16px] resize-y"
                                    placeholder="Explain why you are the best fit for this role..."
                                    value={formData.coverLetter}
                                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-primary text-white w-full py-4 rounded-[0px] font-bold text-[18px] hover:bg-primary/90 disabled:opacity-50 transition-all cursor-pointer"
                            >
                                {submitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
