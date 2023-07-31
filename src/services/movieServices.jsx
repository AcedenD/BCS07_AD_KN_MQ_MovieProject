import { https } from "./config";

export const movieServ = {
  getAllBanner: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachBanner");
  },

  getAllMovie: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03");
  },
  getMovieDetail: (maPhim) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
  getShowtime: (maPhim) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
  },

  deleteMovie: (maPhim) => {
    return https.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  },
  addMovie: (formData) => {
    return https.post("api/QuanLyPhim/ThemPhimUploadHinh", formData);
  },

    updateMovie: (formData) => {
    return https.post("api/QuanLyPhim/CapNhatPhimUpload", formData);


  },
  addLichChieu: (data) => {
    return https.post("api/QuanLyDatVe/TaoLichChieu", data);
  },

  getBookingList: (maLichChieu) => {
    return https.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  },
  postBookedTicket: (data) => {
    return https.post("/api/QuanLyDatVe/DatVe", data);
  },

  addLichChieu: (data) => {
    return https.post("api/QuanLyDatVe/TaoLichChieu", data);
  },
};
