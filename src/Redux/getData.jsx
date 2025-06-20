import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCredits, getJob, getJobById, getProfile } from "../API/ApiFunctions";

export const fetchUserProfile = createAsyncThunk(
  "getData/fetchUserProfile",
  async () => {
    const response = await getProfile();
    return response.data.data;
  }
);

export const fetchJobs = createAsyncThunk("getData/fetchJobs", async () => {
  const response = await getJob();
  return response.data.data;
});

export const fetchCredits = createAsyncThunk(
  "getData/fetchCredits",
  async () => {
    const response = await getCredits();
    if (response) {
      if (response.data.data.length <= 0) {
        showErrorToast("No credits found");
      } else {
        return response.data;
      }
    }
  }
);

export const fetchJobsById = createAsyncThunk(
  "getData/fetchJobsById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getJobById(id);

      // simulate API returning error-like data
      if (response.status !== 200) {
        return rejectWithValue({ error: response.message, response });
      }

      return response;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  employer: null,
  jobs: null,
  jobsById: null,
  jobCredit: null,
  dataBaseCredit: null,
  creditsData: null,
  loading: false,
  error: null,
};

const getDataSlice = createSlice({
  name: "getData",
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
        state.jobsById = action.payload.data.data;
      })
      .addCase(fetchJobsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.jobsById = null;
      })
      .addCase(fetchCredits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.jobCredit = action.payload.totalActiveJobCredits;
        state.creditsData = action.payload.data;
        state.dataBaseCredit = action.payload.totalActiveDatabaseCredits;
      })
      .addCase(fetchCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.jobCredit = null;
        state.dataBaseCredit = null;
        state.creditsData = null;
      });
  },
});

export default getDataSlice.reducer;
