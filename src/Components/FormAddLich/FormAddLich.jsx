import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { rapServ } from "./../../services/rapServices";
import { movieServ } from "../../services/movieServices";
import moment from "moment";
import { Input, message } from "antd";

const FormAddLich = () => {
  //tittle & Pic
  const [moviePhim, setMoviePhim] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const maPhim = searchParams.get("movieId");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    console.log(maPhim);
    movieServ
      .getMovieDetail(maPhim)
      .then((res) => {
        console.log(res);
        setMoviePhim(res.data.content);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  //selections

  const handleHeThongRapChange = (event) => {
    setSelectedHeThongRap(event.target.options[event.target.selectedIndex].id);
  };
  // const handleCumRapChange = (event) => {
  //   setSelectedCumRap(event.target.options[event.target.selectedIndex].id);
  // };

  const [heThongRap, setHeThongRap] = useState([]);
  const [selectedHeThongRap, setSelectedHeThongRap] = useState("");
  const [cumRap, setCumRap] = useState([]);
  const [selectedDanhSachRap, setSelectedDanhSachRap] = useState([]);
  const [tenRap, setTenRap] = useState([]);
  const [selectedCumRap, setSelectedCumRap] = useState("");

  useEffect(() => {
    rapServ
      .getAllHeThongRap()
      .then((res) => {
        console.log(res);
        setHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedHeThongRap) {
      rapServ
        .getAllCumRap(selectedHeThongRap)
        .then((res) => {
          console.log(res);
          setCumRap(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedHeThongRap]);

  // useEffect(() => {
  //   const selectedCumRapInfo = cumRap.find(
  //     (cumRap) => cumRap.tenCumRap === selectedCumRap
  //   );
  //   if (selectedCumRapInfo) {
  //     setSelectedDanhSachRap(selectedCumRapInfo.danhSachRap);
  //     const tenRapList = selectedCumRapInfo.danhSachRap.map(
  //       (rap) => rap.tenRap
  //     );
  //     setTenRap(tenRapList);
  //   } else {
  //     setSelectedDanhSachRap([]);
  //     setTenRap([]);
  //   }
  // }, [selectedCumRap, cumRap]);

  const handleCumRapChange = (event) => {
    console.log(event.target.value);
    setSelectedCumRap(event.target.value);
  };

  //render options
  const renderHeThong = () => {
    return heThongRap.map((item) => (
      <option
        key={item.maHeThongRap}
        value={item.tenHeThongRap}
        id={item.maHeThongRap}
      >
        {item.tenHeThongRap}
      </option>
    ));
  };

  // const renderCumRap = () => {
  //   console.log(cumRap);
  //   return cumRap.map((item, index) => (
  //     <option key={index} value={item.tenCumRap}>
  //       {item.tenCumRap}
  //     </option>
  //   ));
  // };
  const renderCumRap = () => {
    console.log(cumRap);
    return cumRap.map((item, index) => (
      <option key={index} value={item.maCumRap}>
        {item.tenCumRap}
      </option>
    ));
  };

  // const renderTenRap = () => {
  //   return tenRap.map((item, index) => (
  //     <option key={index} value={item.maRap}>
  //       {item}
  //     </option>
  //   ));
  // };

  //functionAddLichChieu
  const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState("");
  const [selectedRap, setSelectedRap] = useState("");
  const [giaVe, setGiaVe] = useState("");

  const handleNgayChieuGioChieuChange = (event) => {
    console.log(moment(event.target.value).format("DD/MM/YYYY hh:mm:ss"));
    // console.log(event.target.value);
    const date = moment(event.target.value).format("DD/MM/YYYY hh:mm:ss");
    setNgayChieuGioChieu(date);
    // setNgayChieuGioChieu(event.target.value);
  };

  // const handleRapChange = (event) => {
  //   setSelectedRap(event.target.value);
  // };

  const handleGiaVeChange = (event) => {
    setGiaVe(event.target.value);
  };
  // const formData = {
  //   maPhim: maPhim,
  //   ngayChieuGioChieu: values.ngayChieuGioChieu,
  //   maRap: values.cumRap,
  //   giaVe: values.giaVe,
  // };
  const addLichChieu = async () => {
    try {
      const formData = {
        maPhim: maPhim,
        ngayChieuGioChieu: ngayChieuGioChieu,
        // maRap: selectedRap.value,
        maRap: selectedCumRap,
        giaVe: giaVe,
      };

      console.log(formData);
      const response = await movieServ.addLichChieu(formData);
      console.log(response);
      // alert("Thêm lịch chiếu thành công");
      messageApi.success("Thêm lịch chiếu thành công");
      setTimeout(() => {
        window.location.href = "/admin/movie";
      }, 700);
    } catch (error) {
      console.log(error);
      messageApi.error(error.response.data.content);
    }
  };

  return (
    <div>
      {contextHolder}
      <div className="flex flex-col items-center space-y-4 mb-5">
        <h1 className="text-2xl font-bold text-gray-900 ">
          {moviePhim.tenPhim}
        </h1>
        <img
          src={moviePhim.hinhAnh}
          alt="Movie Poster"
          className="w-60 h-auto "
        />
      </div>
      <form
        className="border rounded p-5"
        // onSubmit={addLichChieu}
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="w-full">
            <label
              htmlFor="heThongRap"
              className="me-3 block mb-2 text-sm font-medium text-gray-900 "
            >
              Hệ Thống Rạp
            </label>
            <select onChange={handleHeThongRapChange}>{renderHeThong()}</select>
          </div>

          <div className="w-full">
            <label
              htmlFor="cumRap"
              className="me-3 block mb-2 text-sm font-medium text-gray-900 "
            >
              Cụm Rạp
            </label>
            <select onChange={handleCumRapChange}>{renderCumRap()}</select>
          </div>

          {/* <div className="w-full">
            <label
              htmlFor="tenRap"
              className="me-3 block mb-2 text-sm font-medium text-gray-900 "
            >
              Rạp Chiếu
            </label>
            <select onChange={handleRapChange}>{renderTenRap()}</select>
          </div> */}

          <div className="w-full">
            <label
              htmlFor="ngayChieuGioChieu"
              className="me-3 block mb-2 text-sm font-medium text-gray-900 "
            >
              Ngày Chiếu, Giờ Chiếu
            </label>
            <input
              type="datetime-local"
              id="ngayChieuGioChieu"
              onChange={handleNgayChieuGioChieuChange}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="giaVe"
              className="me-3 block mb-2 text-sm font-medium text-gray-900 "
            >
              Giá Vé
            </label>
            <input
              placeholder="Nhập giá vé"
              onChange={handleGiaVeChange}
              type="number"
              id="giaVe"
              min="75000"
              max="200000"
              step="10000"
            />
          </div>
          <button
            className="bg-green-600 px-5 py-2 text-white rounded-lg mb-5 "
            type="button"
            onClick={addLichChieu}
          >
            <i class="fa-solid fa-plus"></i> Thêm Lịch Chiếu
          </button>
        </div>
      </form>
      {/* <p>maphim{maPhim}ngay{ngayChieuGioChieu}cumrap{selectedRap}gia{giaVe}</p> */}
    </div>
  );
};

export default FormAddLich;
