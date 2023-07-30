import React from "react";
import moment from "moment";

const TabItem = (props) => {
  console.log("TabItem: ", props.heThongRap.cumRapChieu);
  const handleClickMaLichChieu = (maLichChieu) => {
    props.setMaLichChieu(maLichChieu);
  };
  const convertDatetoHour = (ngayChieuGioChieu) => {
    const date = new Date(ngayChieuGioChieu);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}`;
  };
  const renderCumRapChieu = () => {
    return props.heThongRap.cumRapChieu?.map((cumRap, index) => (
      <div className="container" key={index}>
        <div className="flex">
          <div className="w-2/12">
            <img src={cumRap.hinhAnh} alt="" />
          </div>
          <div className="text-left w-10/12">
            <p>{cumRap.tenCumRap}</p>
            <p className="truncate ...">{cumRap.diaChi}</p>
            {cumRap.lichChieuPhim?.map((item, index) => (
              <button
                onClick={() => handleClickMaLichChieu(item.maLichChieu)}
                key={index}
              >
                {convertDatetoHour(item.ngayChieuGioChieu)}
              </button>
            ))}
            {/* <div>{moment(cumRap.lichChieuPhim).format("DD/MM/YYY , h:mm")}</div> */}
          </div>
        </div>
      </div>
    ));
  };
  return renderCumRapChieu();
};

export default TabItem;
