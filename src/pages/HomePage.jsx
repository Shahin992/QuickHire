import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/slices/jobSlice';
import HeroSection from '../components/home/HeroSection';
import CompaniesSection from '../components/home/CompaniesSection';
import CategoriesSection from '../components/home/CategoriesSection';
import PromoSection from '../components/home/PromoSection';
import FeaturedJobsSection from '../components/home/FeaturedJobsSection';
import LatestJobsSection from '../components/home/LatestJobsSection';

const HomePage = () => {
    const dispatch = useDispatch();
    const { jobs, loading } = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    // Force exact counts to match grid visually, repeating entries if the DB has less than required (per user request to "randomly use these cards again and again")
    const padArray = (arr, length) => {
        if (!arr || arr.length === 0) return [];
        const result = [...arr];
        while (result.length < length) {
            result.push({ ...arr[result.length % arr.length], _id: Math.random().toString() }); // random ID for react keys if duplicated
        }
        return result.slice(0, length);
    };

    const rawFeatured = jobs.length > 0 ? jobs.slice(0, 8) : [];
    const featuredJobs = rawFeatured.length > 0 ? padArray(rawFeatured, 8) : [];

    // The rest of the payload goes to latest, matching Figma precisely without array reversing tricks modifying the DOM layout
    const rawLatest = jobs.length > 8 ? jobs.slice(8, 16) : rawFeatured; // Fallback to featured if < 8 total
    const latestJobs = rawLatest.length > 0 ? padArray(rawLatest, 8) : [];

    const getTagStyles = (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes('full-time') || lower.includes('full time')) return 'border border-primary text-primary bg-white';
        if (lower.includes('marketing')) return 'bg-[#FFF2E7] text-[#EB8533] border-transparent';
        if (lower.includes('design')) return 'bg-[#E7F6EA] text-[#0E9347] border-transparent';
        if (lower.includes('management') || lower.includes('business')) return 'bg-[#EBEBFF] text-primary border-transparent';
        return 'bg-gray-100 text-gray-600 border-transparent';
    };

    return (
        <div>
            <HeroSection />
            <CompaniesSection />
            <CategoriesSection />
            <PromoSection />
            <FeaturedJobsSection featuredJobs={featuredJobs} loading={loading} />
            <LatestJobsSection latestJobs={latestJobs} loading={loading} getTagStyles={getTagStyles} />
        </div>
    );
};

export default HomePage;
