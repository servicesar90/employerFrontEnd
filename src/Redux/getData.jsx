import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getJob, getJobById, getProfile } from '../API/ApiFunctions';


export const fetchUserProfile = createAsyncThunk('getData/fetchUserProfile', async () => {
  const response = await getProfile();
  return response.data.data;
});

export const fetchJobs = createAsyncThunk('getData/fetchJobs', async () => {
  const response = await getJob();
  return response.data.data;
});

export const fetchJobsById = createAsyncThunk('getData/fetchJobsById', async (id) => {
  const response = await getJobById(id);
  return response.data.data;
});

const initialState = {
  employer: null,
  jobs: null,
  jobsById: null,
  loading: false,
  error: null,
};


const getDataSlice = createSlice({
  name: 'getData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchJobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //fetch JobsById
      .addCase(fetchJobsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsById.fulfilled, (state, action) => {
        state.loading = false;
        state.jobsById = action.payload;
      })
      .addCase(fetchJobsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getDataSlice.reducer;
