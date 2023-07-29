import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { rapServ } from "../../services/rapServices";
import moment from "moment";

// maHeThongRap parameter from TabMovie
const TabMovieItem = ({ maHeThongRap }) => {
  const [lichChieu, setLichChieu] = useState([]);

  useEffect(() => {
    rapServ
      .getAllLichChieuHeThong(maHeThongRap)
      .then((res) => {
        console.log(res);
        setLichChieu(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maHeThongRap]); // rerun when maHeThongRap change ("shouldComponentUpdate")

  const renderTabMovieItem = () => {
    // lichChieu[0]? có nghĩa là nếu phần tử đầu tiên của mảng có thì mới .lstCumRap và map
    return lichChieu[0]?.lstCumRap.map((item, index) => {
      return {
        label: (
          <div className="text-left w-60">
            <p>{item.tenCumRap}</p>
            <p className="truncate ...">{item.diaChi}</p>
          </div>
        ),
        key: index,
        children: (
          <div className="space-y-5">
            {item.danhSachPhim.map((item, index) => {
              if (item.dangChieu) {
                return (
                  <div className="flex" key={index}>
                    <div className="w-1/4 ">
                      <img src={item.hinhAnh} alt="" />
                    </div>
                    <div className="w-10/12 ml-3">
                      <h3 className="text-xl font-bold">{item.tenPhim}</h3>
                      <div className="flex flex-wrap">
                        {item.lstLichChieuTheoPhim
                          .slice(0, 5)
                          .map((suatChieu, index) => {
                            return (
                              <p
                                key={index}
                                className="w-1/3 border border-gray-300 rounded-md py-2 px-3 my-2 shadow-md mr-2 min-w-max"
                              >
                                <span className="mr-2 font-bold text-green-600">
                                  {moment(suatChieu.ngayChieuGioChieu).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                                <span className="mr-2 font-bold text-red-600">
                                  {moment(suatChieu.ngayChieuGioChieu).format(
                                    "HH:mm "
                                  )}
                                </span>
                              </p>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ),
      };
    });
  };

  return (
    <Tabs
      tabPosition={"left"}
      style={{ maxHeight: "400px", overflowY: "scroll" }}
      items={renderTabMovieItem()}
    />
  );
};

export default TabMovieItem;
