import { useEffect } from 'react'
import CategoriesSection from '../components/home/CategoriesSection'
import CompaniesSection from '../components/home/CompaniesSection'
import FeaturedJobsSection from '../components/home/FeaturedJobsSection'
import HeroSection from '../components/home/HeroSection'
import LatestJobsSection from '../components/home/LatestJobsSection'
import PromoSection from '../components/home/PromoSection'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchJobs } from '../redux/slices/jobSlice'
import type { Job } from '../types'

const HomePage = () => {
    const dispatch = useAppDispatch()
    const { jobs, loading } = useAppSelector((state) => state.jobs)

    useEffect(() => {
        dispatch(fetchJobs())
    }, [dispatch])

    const padArray = (items: Job[], length: number): Job[] => {
        if (items.length === 0) return []

        const result = [...items]

        while (result.length < length) {
            const sourceJob = items[result.length % items.length]
            result.push({ ...sourceJob, _id: `${sourceJob._id || sourceJob.title}-${result.length}` })
        }

        return result.slice(0, length)
    }

    const rawFeatured = jobs.length > 0 ? jobs.slice(0, 8) : []
    const featuredJobs = rawFeatured.length > 0 ? padArray(rawFeatured, 8) : []
    const rawLatest = jobs.length > 8 ? jobs.slice(8, 16) : rawFeatured
    const latestJobs = rawLatest.length > 0 ? padArray(rawLatest, 8) : []

    return (
        <div>
            <HeroSection />
            <CompaniesSection />
            <CategoriesSection />
            <PromoSection />
            <FeaturedJobsSection featuredJobs={featuredJobs} loading={loading} />
            <LatestJobsSection latestJobs={latestJobs} loading={loading} />
        </div>
    )
}

export default HomePage
