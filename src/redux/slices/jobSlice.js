import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobService } from '../../services/api';

const serializeParams = (params = {}) => {
    const normalizedParams = params && typeof params === 'object' ? params : {};
    const sortedEntries = Object.entries(normalizedParams).sort(([a], [b]) => a.localeCompare(b));
    return JSON.stringify(Object.fromEntries(sortedEntries));
};

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (params, { rejectWithValue }) => {
        try {
            const response = await jobService.getJobs(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch jobs' });
        }
    },
    {
        condition: (params, { getState }) => {
            const requestKey = serializeParams(params);
            const { jobs } = getState();

            if (jobs.loading && jobs.currentJobsRequestKey === requestKey) {
                return false;
            }

            return true;
        },
    }
);

export const fetchJobById = createAsyncThunk(
    'jobs/fetchJobById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await jobService.getJobById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch job details' });
        }
    },
    {
        condition: (id, { getState }) => {
            const { jobs } = getState();

            if (jobs.loadingCurrentJob && jobs.currentJobRequestId === id) {
                return false;
            }

            return true;
        },
    }
);

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (id, { rejectWithValue }) => {
    try {
        await jobService.deleteJob(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Failed to delete job' });
    }
});

const jobSlice = createSlice({
    name: 'jobs',
    initialState: {
        jobs: [],
        currentJob: null,
        loading: false,
        loadingCurrentJob: false,
        currentJobsRequestKey: null,
        currentJobRequestId: null,
        deletingJobId: null,
        error: null,
    },
    reducers: {
        clearCurrentJob: (state) => {
            state.currentJob = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state, action) => {
                state.loading = true;
                state.currentJobsRequestKey = serializeParams(action.meta.arg);
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.currentJobsRequestKey = null;
                state.jobs = action.payload;
                state.error = null;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.currentJobsRequestKey = null;
                state.error = action.payload;
            })
            .addCase(fetchJobById.pending, (state, action) => {
                state.loading = true;
                state.loadingCurrentJob = true;
                state.currentJobRequestId = action.meta.arg;
            })
            .addCase(fetchJobById.fulfilled, (state, action) => {
                state.loading = false;
                state.loadingCurrentJob = false;
                state.currentJobRequestId = null;
                state.currentJob = action.payload;
                state.error = null;
            })
            .addCase(fetchJobById.rejected, (state, action) => {
                state.loading = false;
                state.loadingCurrentJob = false;
                state.currentJobRequestId = null;
                state.error = action.payload;
            })
            .addCase(deleteJob.pending, (state, action) => {
                state.deletingJobId = action.meta.arg;
                state.error = null;
            })
            .addCase(deleteJob.fulfilled, (state) => {
                state.deletingJobId = null;
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.deletingJobId = null;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentJob } = jobSlice.actions;
export default jobSlice.reducer;
