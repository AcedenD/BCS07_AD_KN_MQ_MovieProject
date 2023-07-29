import React, { useEffect, useState } from "react";
import Seats from "../Seats/Seats";
import FormBooking from "../FormBooking/FormBooking";
import { movieServ } from "../../services/movieServices";
import { useParams } from "react-router-dom";

const BookingTicket = () => {
  const { maLichChieu } = useParams();
  const [seatList, setSeatList] = useState([]);
  const [movieInfo, setMovieInfo] = useState({});
  useEffect(() => {
    movieServ
      .getBookingList(maLichChieu)
      .then((res) => {
        console.log(res);
        setSeatList(res.data.content.danhSachGhe);
        setMovieInfo(res.data.content.thongTinPhim);
        console.log("content: ", res.data.content.thongTinPhim);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex mt-10">
      <div className="w-8/12">
        <Seats seatList={seatList} />
      </div>
      <div className="w-4/12">
        <FormBooking movieInfo={movieInfo} />
      </div>
    </div>
  );
};

export default BookingTicket;
