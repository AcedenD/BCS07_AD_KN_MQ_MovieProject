import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieServ } from "../../services/movieServices";
import { layDuLieuLocal } from "../../utils/localStore";


export const getAllMovie = createAsyncThunk("movies/getAllMovie", async () => {
  const res = await movieServ.getAllMovie();
  return res.data.content;
});


const initialState ={
  tenPhim: layDuLieuLocal('user'),
  phimData: [],
};


export const movieSlice = createSlice({
  name:'movies',
  initialState,
  reducers:{
  },
    extraReducers: (builder) => {
    builder
    
      // .addCase(getAllMovie.pending, (state) => {
      //   state.status = "loading";
      // })
      .addCase(getAllMovie.fulfilled, (state, action) => {
        // const index =state.phimData.findIndex(
        //   (phimData)=> phimData.maPhim ===action.payload.maPhim);
        state.phimData = action.payload;
      })
      // .addCase(getAllMovie.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // });
  },

})


export const {} = movieSlice.actions

export default movieSlice.reducer