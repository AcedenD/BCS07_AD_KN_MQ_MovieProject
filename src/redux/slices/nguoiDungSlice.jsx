import { createSlice } from "@reduxjs/toolkit";
import { layDuLieuLocal } from "../../utils/localStore";

const initialState = {
  hoTen: layDuLieuLocal("user"),
};

export const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {
    setDuLieuHoTen: (state, action) => {
      // check hoTen have value, if doesn't have then set value
      console.log(action);
      if (state.hoTen == {}) {
        state.hoTen = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDuLieuHoTen } = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
