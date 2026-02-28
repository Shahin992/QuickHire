import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchJobs, deleteJob } from '../redux/slices/jobSlice';
import ConfirmationDialog from '../components/ConfirmationDialog';
import TableRowsSkeleton from '../components/TableRowsSkeleton';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { jobs, loading, deletingJobId, error } = useSelector((state) => state.jobs);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [jobToDelete, setJobToDelete] = useState(null);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
            dispatch(fetchJobs());
        }
    }, [dispatch, userInfo, navigate]);

    const isDeleting = Boolean(jobToDelete && deletingJobId === jobToDelete._id);

    const deleteDescription = useMemo(() => {
        if (!jobToDelete) return '';

        return `This will permanently remove "${jobToDelete.title}" from ${jobToDelete.companyName}. This action cannot be undone.`;
    }, [jobToDelete]);

    const handleDeleteConfirm = async () => {
        if (!jobToDelete?._id) return;

        try {
            await dispatch(deleteJob(jobToDelete._id)).unwrap();
            await dispatch(fetchJobs()).unwrap();
            setJobToDelete(null);
        } catch {
            console.log('error');
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Link
                    to="/admin/post"
                    className="bg-primary text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2"
                >
                    <Plus size={20} /> Post New Job
                </Link>
            </div>

            {error?.message && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-['Inter'] text-sm text-red-600">
                    {error.message}
                </div>
            )}

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-sm text-muted uppercase">Job Title</th>
                            <th className="px-6 py-4 font-bold text-sm text-muted uppercase">Category</th>
                            <th className="px-6 py-4 font-bold text-sm text-muted uppercase">Type</th>
                            <th className="px-6 py-4 font-bold text-sm text-muted uppercase">Location</th>
                            <th className="px-6 py-4 font-bold text-sm text-muted uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading && jobs.length === 0 ? (
                            <TableRowsSkeleton rows={6} columns={5} />
                        ) : jobs.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-10 text-center text-muted">No jobs found.</td></tr>
                        ) : (
                            jobs.map((job) => (
                                <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-dark">{job.title}</p>
                                        <p className="text-muted text-xs">{job.companyName}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-50 text-primary px-3 py-1 rounded-full text-xs font-semibold">{job.category}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{job.jobType}</td>
                                    <td className="px-6 py-4 text-sm">{job.location}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-3">
                                        <Link
                                            to={`/job/${job._id}`}
                                            className="p-2 text-muted hover:text-primary transition-colors"
                                            title="View Public Link"
                                        >
                                            <ExternalLink size={18} />
                                        </Link>
                                        <button
                                            onClick={() => setJobToDelete(job)}
                                            disabled={deletingJobId === job._id}
                                            className="p-2 text-muted hover:text-red-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                            title="Delete Job"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmationDialog
                isOpen={Boolean(jobToDelete)}
                title="Delete job post?"
                description={deleteDescription}
                confirmText="Delete post"
                cancelText="Keep post"
                onConfirm={handleDeleteConfirm}
                onCancel={() => {
                    if (!isDeleting) {
                        setJobToDelete(null);
                    }
                }}
                loading={isDeleting}
            />
        </div>
    );
};

export default AdminDashboard;
