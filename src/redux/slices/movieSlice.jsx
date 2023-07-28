import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieServ } from "../../services/movieServices";

// Define initial state
const initialState = {
  movies: [],
  status: "idle",
  error: null,
};

// Define async thunk to fetch movie data
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await movieServ.getAllMovie();
  return response.data;
});

// Create the Redux slice
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export const { reducer } = movieSlice;
export default movieSlice;
