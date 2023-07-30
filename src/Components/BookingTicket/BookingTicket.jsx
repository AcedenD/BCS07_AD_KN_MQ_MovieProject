import React, { useEffect, useState } from "react";
import Seats from "../Seats/Seats";
import FormBooking from "../FormBooking/FormBooking";
import { movieServ } from "../../services/movieServices";
import { useParams } from "react-router-dom";

const BookingTicket = () => {
  const { maLichChieu } = useParams();
  const [seatList, setSeatList] = useState([]);
  const [movieInfo, setMovieInfo] = useState({});
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);

  useEffect(() => {
    console.log("isRefetch: ", isRefetch);
    movieServ
      .getBookingList(maLichChieu)
      .then((res) => {
        setSeatList(res.data.content.danhSachGhe);
        setMovieInfo(res.data.content.thongTinPhim);
        setIsRefetch(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maLichChieu, isRefetch]);

  const handleClickSelectSeat = (maGhe) => {
    const seatItem = seatList.find((item) => item.maGhe === maGhe);
    console.log("seatItem: ", seatItem);
    if (selectedSeat.find((item) => item.maGhe === maGhe)) {
      const newSelectedSeat = selectedSeat.filter((ma) => ma.maGhe !== maGhe);
      setSelectedSeat(newSelectedSeat);
    } else {
      setSelectedSeat([...selectedSeat, seatItem]);
    }
  };
  console.log("selectedSeat: ", selectedSeat);

  return (
    <div className="flex mt-10">
      <div className="w-8/12">
        <Seats
          seatList={seatList}
          handleClickSelectSeat={handleClickSelectSeat}
          selectedSeat={selectedSeat}
        />
        <ul class="showcase">
          <li>
            <div class="seat"></div>
            <small>Available</small>
          </li>
          <li>
            <div class="seat vip"></div>
            <small>VIP</small>
          </li>
          <li>
            <div class="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div class="seat sold"></div>
            <small>Sold</small>
          </li>
        </ul>
      </div>
      <div className="w-4/12 mr-10">
        <FormBooking
          movieInfo={movieInfo}
          selectedSeat={selectedSeat}
          setSeatList={setSeatList}
          setSelectedSeat={setSelectedSeat}
          setIsRefetch={setIsRefetch}
        />
      </div>
    </div>
  );
};

export default BookingTicket;
