import React from "react";
import moment from "moment";

const TabItem = (props) => {
  console.log("TabItem: ", props.heThongRap.cumRapChieu);
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
              <p key={index}>{item.ngayChieuGioChieu}</p>
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
