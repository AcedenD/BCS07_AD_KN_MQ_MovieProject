import React from "react";
import { useParams } from "react-router-dom";
import { movieServ } from "../../services/movieServices";
import { message } from "antd";

const FormBooking = (props) => {
  const { maLichChieu } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const tinhTongTien = () => {
    let sum = 0;
    props.selectedSeat.forEach((item) => {
      sum += item.giaVe;
    });
    return sum;
  };
  const handleClickSubmit = async () => {
    const covertSelectedSeat = props.selectedSeat.map((item) => ({
      maGhe: item.maGhe,
      giaVe: item.giaVe,
    }));
    const request = {
      maLichChieu: maLichChieu,
      danhSachVe: covertSelectedSeat,
    };

    try {
      const res = await movieServ.postBookedTicket(request);

      messageApi.success("Đặt vé thành công!");
      props.setSelectedSeat([]);
      props.setIsRefetch(true);
    } catch (error) {
      messageApi.error("Oops! Có lỗi xảy ra kìa huhu >.<!");
    }
  };
  console.log(tinhTongTien());
  console.log(props.movieInfo);
  return (
    <div>
      {contextHolder}
      <div class="px-4 sm:px-0 text-center">
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          {props.movieInfo.tenPhim}
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {props.movieInfo.tenCumRap}
        </p>
      </div>
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              NGÀY CHIẾU
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {props.movieInfo.ngayChieu}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              GIỜ CHIẾU
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {props.movieInfo.gioChieu}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">ĐỊA CHỈ</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {props.movieInfo.diaChi}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">RẠP</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {props.movieInfo.tenRap}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              GHẾ CHỌN
            </dt>
            <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {props.selectedSeat.map((ghe, index) => (
                <p key={index}>
                  <span className="text-red-500">{ghe.stt}</span>:
                  <span className="font-normal">${ghe.giaVe}</span>
                </p>
              ))}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">ƯU ĐÃI</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              0%
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              TỔNG TIỀN
            </dt>
            <dd class="mt-1 text-sm leading-6 text-red-500 font-bold sm:col-span-2 sm:mt-0">
              ${tinhTongTien()}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <button
              disabled={!props.selectedSeat.length}
              onClick={() => handleClickSubmit()}
              className={`rounded-md border border-transparent bg-indigo-600 px-5 py-3 mt-5 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                !props.selectedSeat.length ? "disabled" : ""
              }`}
            >
              Đặt vé
            </button>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default FormBooking;
