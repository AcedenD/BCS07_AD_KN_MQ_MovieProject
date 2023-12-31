import React, { useEffect, useState } from "react";
import { movieServ } from "../../services/movieServices";
import TabMovieDetail from "./TabMovieDetail/TabMovieDetail";
import { Button, Modal } from "antd";
import { NavLink } from "react-router-dom";
import "./MovieDetail.css";
import {
  set_loading_ended,
  set_loading_started,
} from "../../redux/slices/loadingSlice";
import { useDispatch } from "react-redux";

const MovieDetail = (props) => {
  const [movieDetail, setMovieDetail] = useState({});
  const [showtime, setShowtime] = useState([]);
  const [maLichChieu, setMaLichChieu] = useState("");
  const dispatch = useDispatch();
  // console.log("maLichChieu:", maLichChieu);
  // console.log("movieDetail: ", movieDetail);
  useEffect(() => {
    dispatch(set_loading_started());
    movieServ
      .getMovieDetail(props.maPhim)
      .then((res) => {
        console.log(res);
        setMovieDetail(res.data.content);
        setTimeout(() => {
          dispatch(set_loading_ended());
        }, 1200);
      })
      .catch((err) => {
        console.log(err);
        dispatch(set_loading_ended());
      });
  }, [props.maPhim]);
  useEffect(() => {
    movieServ
      .getShowtime(props.maPhim)
      .then((res) => {
        console.log("res: ", res);
        setShowtime(res.data.content.heThongRapChieu);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.maPhim]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="container">
      <div className="bg-white">
        <div className="pt-6 flex m-auto">
          {/* Image gallery */}
          <div className="w-5/12 mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="movie_image aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={movieDetail.hinhAnh}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          {/* Film info */}
          <div className="w-7/12 mx-auto ax-w-2xl px-4 pb-5 pt-2 sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-10">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {movieDetail.tenPhim}
              </h1>
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="mb-3 text-sm font-bold text-gray-900">Mô tả:</h3>
                <div className="space-y-5">
                  <p className="text-base text-gray-900">{movieDetail.moTa}</p>
                </div>
                <h3 className="mt-5 text-sm font-bold text-gray-900">
                  Thời lượng:
                  <span className="font-normal ml-3">
                    {showtime[0] &&
                    showtime[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong ? (
                      <div className="ml-2 inline-block">
                        {showtime[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong}
                        <span className="ml-2">phút</span>
                      </div>
                    ) : (
                      "Chưa rõ"
                    )}
                  </span>
                </h3>
                <h3 className="mt-5 text-sm font-bold text-gray-900">
                  Đánh giá:
                  <span className="font-normal ml-3">
                    {movieDetail.danhGia}
                  </span>
                </h3>
                <h3 className="mt-5 text-sm font-bold text-gray-900">
                  Trạng thái:
                  <span className="font-normal ml-3">
                    {movieDetail.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
                  </span>
                </h3>
              </div>
            </div>
            <button
              onClick={showModal}
              className="rounded-md border border-transparent bg-indigo-600 px-5 py-3 mt-5 mr-5 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Xem trailer
            </button>
            <NavLink
              to={maLichChieu ? `booking/${maLichChieu}` : ""}
              className={`rounded-md border border-transparent bg-indigo-600 px-5 py-3 mt-5 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                !maLichChieu ? "disabled" : ""
              }`}
            >
              Mua vé ngay
            </NavLink>
          </div>
        </div>
        {/* TrailerVideo Modal */}
        <Modal
          width="1000"
          height="1000"
          title={movieDetail.tenPhim}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          <video className="m-auto" width="1000" height="1000" controls>
            <source src={movieDetail.trailer} type="video/mp4" />
          </video>
        </Modal>
      </div>
      {showtime.length !== 0 ? (
        <div>
          <p className="text-red-500 italic mt-8 ml-8">
            * Vui lòng chọn cụm rạp và giờ chiếu trước khi đặt vé!
          </p>
          <TabMovieDetail showtime={showtime} setMaLichChieu={setMaLichChieu} />
        </div>
      ) : (
        <p className="text-red-500 italic mt-8 ml-8">
          * Hiện chưa có lịch chiếu
        </p>
      )}
    </div>
  );
};

export default MovieDetail;
