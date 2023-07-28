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
    return https.delete(
      `api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`
    );
  },
    addMovie: (data) => {
    return https.post("api/QuanLyPhim/ThemPhimUploadHinh", data);

  },
    editMovie: (MovieData) => {
    return https.get(
      "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      MovieData
    );
  },
};
