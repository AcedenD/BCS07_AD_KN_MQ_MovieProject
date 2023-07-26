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
};
