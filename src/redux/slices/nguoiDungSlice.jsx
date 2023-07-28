import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { layDuLieuLocal } from "../../utils/localStore";
import { nguoiDungServ } from "../../services/nguoiDungServices";

// // nơi tạo các createAsyncThunk để xử lí các bất đồng bộ trước khi bắn dữ liệu lên store bằng redux-thunk, from @redux/toolkit

export const getAllUser = createAsyncThunk("nguoiDung/getAllUser", async () => {
  const res = await nguoiDungServ.getAllUser();
  // sẽ return về giá trị muốn store lưu trữ
  return res.data.content;
});

const initialState = {
  hoTen: layDuLieuLocal("user"),
  users: [],
};

export const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {
    setDuLieuHoTen: (state, action) => {
      // check hoTen have value, if doesn't have then set value
      console.log(action);
      if (state.hoTen == null) {
        state.hoTen = action.payload;
      }
    },
  },

  // extraReducer process async logic
  // extraReducer giúp tách biệt các logic bất đồng bộ ra khỏi reducer vì khi xử lí bất đồng bộ có nhiều trường hợp xảy ra
  extraReducers: (builder) => {
    // khi xử lí thì bên trong hàm sẽ có 3 phương thức tương ứng với các trường hợp chạy thành công, đang chạy, thất bại
    // fulfilled, pending, reject
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      const index = state.users.findIndex(
        (user) => user.taiKhoan === action.payload.taiKhoan
      );
      // in action, payload will return data
      state.users = action.payload;
      // console.log(action);
      // console.log(state);
    });

    // reject will run when async function run and return err
    // builder.addCase(getAllUser.rejected, (state, action) => {
    //   state.users = [
    //     {
    //       hoTen: "Aden",
    //       maLoaiNguoiDung: "QuanTri",
    //     },
    //   ];
    // });

    // builder.addCase(getAllUser.pending, (state, action) => {
    //   console.log("hello");
    // });
  },
});

// Action creators are generated for each case reducer function
export const { setDuLieuHoTen } = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
