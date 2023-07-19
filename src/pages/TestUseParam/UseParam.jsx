import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieServ } from "../../services/movieServices";
import MovieDetail from "../../Components/MovieDetail/MovieDetail";

const UseParam = () => {
  let { maPhim } = useParams();
  // console.log(maPhim);

  return (
    <div>
      <MovieDetail maPhim={maPhim} />
    </div>
  );
};

export default UseParam;
