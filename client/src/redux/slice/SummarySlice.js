import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
const initialState = {
  opened: false,
  loading: false,
  summary: '',
  error: null,
};

export const generateSummary = createAsyncThunk(
  '/generatesummary',
  async (article, { rejectWithValue }) => {
    console.log(article.url)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/summarize`,
        {
          url: article.url,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const SummarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers : {
  setOpended : function(state,action){
    state.opened = !state.opened
  },
  open : function(state){
    state.opened = true ;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateSummary.pending, (state) => {
        state.opened = true;
        state.loading = true;
      })
      .addCase(generateSummary.fulfilled, (state, action) => {
        state.summary = action.payload.summary;
        state.loading = false
      })
      .addCase(generateSummary.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false
      });
  },
});

export default SummarySlice.reducer;
export const {setOpended , open} = SummarySlice.actions