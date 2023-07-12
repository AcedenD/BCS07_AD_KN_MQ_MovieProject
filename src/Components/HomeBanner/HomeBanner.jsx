import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "antd";
// already import in movieServices
// import { https } from "../../services/config";
import { movieServ } from "../../services/movieServices";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const HomeBanner = () => {
  // useState is state and setState for any state
  const [banner, setBanner] = useState([]);
  const getAllBanner = async () => {
    const res = await movieServ.getAllBanner();
    console.log(res);
    setBanner(res.data.content);
    // console.log(banner);
  };

  // same as componentDidMount
  useEffect(() => {
    getAllBanner();
  }, []);

  return (
    <Carousel>
      {banner.map((banner, index) => {
        return (
          <div key={index} className="h-70vh">
            <img className="w-full object-cover" src={banner.hinhAnh} alt="" />
          </div>
        );
      })}
    </Carousel>
  );
};

export default HomeBanner;
