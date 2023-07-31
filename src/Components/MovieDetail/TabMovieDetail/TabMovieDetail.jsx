import React from "react";
import { Tabs } from "antd";
import TabItem from "./TabItem";
import "./Tab.css";

const TabMovieDetail = (props) => {
  const renderShowtime = () => {
    return props.showtime.map((item, index) => ({
      label: (
        <div className="flex items-center justify-center gap-3">
          <img src={item.logo} className="logo h-10 w-5/12" alt="" />
          <h3 className="w-7/12">{item.tenHeThongRap}</h3>
        </div>
      ),
      key: index,
      children: (
        <TabItem heThongRap={item} setMaLichChieu={props.setMaLichChieu} />
      ),
    }));
  };
  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <Tabs tabPosition={"left"} items={renderShowtime()} />
    </div>
  );
};

export default TabMovieDetail;
