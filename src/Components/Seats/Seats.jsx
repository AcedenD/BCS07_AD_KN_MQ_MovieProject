import React from "react";
import "./Seats.css";

const Seats = (props) => {
  //   const [count, setCount] = useState(0);
  let count = 0;
  const convertArrSeats = () => {
    let arr = [];
    for (let i = 1; i <= props.seatList.length / 16; i++) {
      const seats = props.seatList.filter(
        (item) => Number(item.stt) > count && Number(item.stt) <= 16 * i
      );
      arr.push(seats);
      count += 16;
    }
    return arr;
  };
  //   console.log("props: ", props.seatList);
  //   console.log("convert: ", convertArrSeats());
  return (
    <div className="container">
      <div className="screen">SCREEN</div>
      {convertArrSeats().map((item, index) => {
        return (
          <div className="row" key={index}>
            {item.map((ghe) => {
              return (
                <button
                  className={`seat ${ghe.loaiGhe === "Vip" ? "vip" : ""} ${
                    props.selectedSeat?.find((ma) => ma.maGhe === ghe.maGhe)
                      ? "selected"
                      : ""
                  } ${ghe.daDat ? "sold" : ""}`}
                  disabled={ghe.daDat}
                  key={ghe.maGhe}
                  onClick={() => {
                    props.handleClickSelectSeat(ghe.maGhe);
                  }}
                ></button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Seats;
