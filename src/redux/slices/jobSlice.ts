import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { jobService } from '../../services/api'
import type { RootState } from '../store'
import type { ApiError, Job, JobQueryParams } from '../../types'

interface JobsState {
  jobs: Job[]
  currentJob: Job | null
  loading: boolean
  loadingCurrentJob: boolean
  currentJobsRequestKey: string | null
  currentJobRequestId: string | null
  deletingJobId: string | null
  error: ApiError | null
}

const serializeParams = (params: JobQueryParams = {}) => {
  const sortedEntries = Object.entries(params).sort(([a], [b]) => a.localeCompare(b))
  return JSON.stringify(Object.fromEntries(sortedEntries))
}

const initialState: JobsState = {
  jobs: [],
  currentJob: null,
  loading: false,
  loadingCurrentJob: false,
  currentJobsRequestKey: null,
  currentJobRequestId: null,
  deletingJobId: null,
  error: null,
}

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params: JobQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await jobService.getJobs(params)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch jobs' })
    }
  },
  {
    condition: (params: JobQueryParams | undefined, { getState }) => {
      const requestKey = serializeParams(params)
      const { jobs } = getState() as RootState

      if (jobs.loading && jobs.currentJobsRequestKey === requestKey) {
        return false
      }

      return true
    },
  },
)

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await jobService.getJobById(id)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch job details' })
    }
  },
  {
    condition: (id: string, { getState }) => {
      const { jobs } = getState() as RootState

      if (jobs.loadingCurrentJob && jobs.currentJobRequestId === id) {
        return false
      }

      return true
    },
  },
)

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (id: string, { rejectWithValue }) => {
    try {
      await jobService.deleteJob(id)
      return id
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete job' })
    }
  },
)

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearCurrentJob: (state) => {
      state.currentJob = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state, action) => {
        state.loading = true
        state.currentJobsRequestKey = serializeParams(action.meta.arg)
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.loading = false
        state.currentJobsRequestKey = null
        state.jobs = action.payload
        state.error = null
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.currentJobsRequestKey = null
        state.error = (action.payload as ApiError) || { message: 'Failed to fetch jobs' }
      })
      .addCase(fetchJobById.pending, (state, action) => {
        state.loading = true
        state.loadingCurrentJob = true
        state.currentJobRequestId = action.meta.arg
      })
      .addCase(fetchJobById.fulfilled, (state, action: PayloadAction<Job>) => {
        state.loading = false
        state.loadingCurrentJob = false
        state.currentJobRequestId = null
        state.currentJob = action.payload
        state.error = null
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false
        state.loadingCurrentJob = false
        state.currentJobRequestId = null
        state.error = (action.payload as ApiError) || { message: 'Failed to fetch job details' }
      })
      .addCase(deleteJob.pending, (state, action) => {
        state.deletingJobId = action.meta.arg
        state.error = null
      })
      .addCase(deleteJob.fulfilled, (state) => {
        state.deletingJobId = null
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.deletingJobId = null
        state.error = (action.payload as ApiError) || { message: 'Failed to delete job' }
      })
  },
})

export const { clearCurrentJob } = jobSlice.actions
export default jobSlice.reducer
