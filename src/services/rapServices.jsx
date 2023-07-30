import { https } from "./config";

export const rapServ = {
  getAllHeThongRap: () => {
    return https.get("/api/QuanLyRap/LayThongTinHeThongRap");
  },
  getAllLichChieuHeThong: (maHeThong) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThong}&maNhom=GP03`
    );
  },
  getAllCumRap: (maHeThong) =>{
    return https.get(
      `api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThong}`
    );    
  }
};
