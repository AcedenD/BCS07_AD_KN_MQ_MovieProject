import { configureStore } from "@reduxjs/toolkit";
import nguoiDungSlice from "./slices/nguoiDungSlice";
import loadingSlice from "./slices/loadingSlice";
import movieSlice from "./slices/movieSlice";

export const store = configureStore({
  reducer: {
    nguoiDung: nguoiDungSlice,
    loading: loadingSlice,
    movies: movieSlice,
  },
});
