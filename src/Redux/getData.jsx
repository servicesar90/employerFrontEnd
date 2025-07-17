import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCredits,
  getJob,
  getJobById,
  getProfile,
  getUnlockedFunc,
  searchCandidateFunc,
} from "../API/ApiFunctions";
import { showErrorToast } from "../components/ui/toast";

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

      return response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const fetchUnlockedCandidate = createAsyncThunk(
  "getData/fetchUnlockedCandidate",
  async () => {
    try {
      const response = await getUnlockedFunc();
      if (response) {
   
        return response.data.data;
      }
    } catch (error) {
      return error;
    }
  }
);

export const fetchSearchedCandidate = createAsyncThunk(
  "getData/fetchSearchedCandidate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await searchCandidateFunc(data);

      // simulate API returning error-like data
      if (response.status !== 200) {
        return rejectWithValue({ error: response.message, response });
      }

      console.log(response)

      return response.data.employees;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  employer: null,
  jobs: null,
  jobsById: null,
  jobData: null,
  jobCredit: null,
  dataBaseCredit: null,
  creditsData: null,
  unlockedData: null,
  loading: false,
  error: null,
  searchedData: null
};

const getDataSlice = createSlice({
  name: "getData",
  initialState,
  reducers: {
    setJobData: (state, action) => {
      state.jobData = action.payload;
    },
  },
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
        state.jobsById = action.payload.data;
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
      })
      .addCase(fetchUnlockedCandidate.pending , (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnlockedCandidate.fulfilled , (state, action)=>{
        
        state.loading = false;
        state.unlockedData = action.payload;
        state.searchedData = null
        state.error = null;
      })
      .addCase(fetchUnlockedCandidate.rejected , (state, action)=>{
        state.loading = false;
        state.unlockedData = null
        state.error = action.error.message;
      })
      .addCase(fetchSearchedCandidate.pending , (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchedCandidate.fulfilled , (state, action)=>{
        
        state.loading = false;
        state.searchedData = action.payload;
        state.unlockedData = null
        state.error = null;
      })
      .addCase(fetchSearchedCandidate.rejected , (state, action)=>{
        state.loading = false;
        state.unlockedData = null
        state.error = action.error.message;
      });
      
  },
});

export const { setJobData } = getDataSlice.actions;

export default getDataSlice.reducer;
