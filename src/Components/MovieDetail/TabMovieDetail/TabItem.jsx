import React from "react";
import "./Tab.css";
import moment from "moment";

const TabItem = (props) => {
  console.log("TabItem: ", props.heThongRap.cumRapChieu);
  const handleClickMaLichChieu = (maLichChieu) => {
    props.setMaLichChieu(maLichChieu);
  };
  const renderCumRapChieu = () => {
    return props.heThongRap.cumRapChieu?.map((cumRap, index) => (
      <div className="container" key={index}>
        <div className="flex">
          <div className="w-2/12 rounded-md overflow-hidden mr-4">
            <img src={cumRap.hinhAnh} alt="" />
          </div>
          <div className="text-left w-10/12">
            <p className="font-bold">{cumRap.tenCumRap}</p>
            <p className="italic truncate ...">{cumRap.diaChi}</p>
            {cumRap.lichChieuPhim?.map((item, index) => (
              <button
                onClick={() => handleClickMaLichChieu(item.maLichChieu)}
                key={index}
                className="cinema_img w-1/3 border border-gray-300 rounded-md py-2 px-2 my-2 shadow-md mr-2 min-w-max"
              >
                <span className="mr-2 font-bold text-green-600">
                  {moment(item.ngayChieuGioChieu).format("DD/MM/YYYY")}
                </span>
                <span className="mr-2 font-bold text-red-600">
                  {moment(item.ngayChieuGioChieu).format("HH:mm ")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    ));
  };
  return renderCumRapChieu();
};

export default TabItem;
