import React, { useEffect, useState } from "react";
import { movieServ } from "../../services/movieServices";
import TabMovieDetail from "./TabMovieDetail/TabMovieDetail";
import { Button, Modal } from "antd";

const MovieDetail = (props) => {
  console.log(props.maPhim);

  const [movieDetail, setMovieDetail] = useState({});
  const [showtime, setShowtime] = useState({});
  console.log(movieDetail);
  useEffect(() => {
    movieServ
      .getMovieDetail(props.maPhim)
      .then((res) => {
        console.log("info: ", res.data.content);
        setMovieDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.maPhim]);
  useEffect(() => {
    movieServ
      .getShowtime(props.maPhim)
      .then((res) => {
        console.log("lich chieu: ", res.data.content);
        setShowtime(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.maPhim]);
  console.log("Dang chieu", movieDetail.dangChieu);
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
    // <div className=" w-screen max-h-96 bg-slate-500 flex justify-center  items-center">
    //   <a
    //     href="..."
    //     className="flex flex-crow items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-3xl max-h-96 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 my-5 p-5"
    //   >
    //     <img
    //       className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    //       src={selectedMovie[0].hinhAnh}
    //       alt="movie hinh anh"
    //     />
    //     <div className="flex flex-col justify-between p-4 leading-normal text-center">
    //       <h5 className=" text-5xl font-bold tracking-tight text-gray-900 dark:text-white my-4">
    //         {selectedMovie[0].tenPhim}
    //       </h5>
    //       <p className="mb-3 font-normal text-xl text-gray-700 dark:text-gray-400 ">
    //         {selectedMovie[0].moTa}
    //       </p>
    //     </div>
    //   </a>
    // </div>
    <div className="container">
      <div className="bg-white">
        <div className="pt-6 flex">
          {/* Image gallery */}
          <div className="mx-auto mt-6 sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={movieDetail.hinhAnh}
                alt="Two each of gray, white, and black shirts laying flat."
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          {/* Film info */}
          <div className="mx-auto max-w-2xl px-4 pb-5 pt-2 sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-10">
            <div className="lg:pr-8">
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
            <button
              type="submit"
              className="rounded-md border border-transparent bg-indigo-600 px-5 py-3 mt-5 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Mua vé ngay
            </button>
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
              Return
            </Button>,
          ]}
        >
          <video className="m-auto" width="1000" height="1000" controls>
            <source src={movieDetail.trailer} type="video/mp4" />
          </video>
        </Modal>
      </div>
      <TabMovieDetail />
    </div>
  );
};

export default MovieDetail;
