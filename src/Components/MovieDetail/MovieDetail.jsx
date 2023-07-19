import React, { useEffect, useState } from "react";
import { movieServ } from "../../services/movieServices";

const MovieDetail = (props) => {
  console.log(props.maPhim);

  let [movies, setMovies] = useState([]);
  let [movie, setMovie] = useState({});

  useEffect(() => {
    movieServ
      .getAllMovie()
      .then((result) => {
        console.log(result);
        setMovies(result.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectedMovie = movies.filter((phim) => {
    return phim.maPhim == props.maPhim;
  });

  console.log(selectedMovie);

  if (selectedMovie.length >= 1) {
    return (
      <div className=" w-screen max-h-96 bg-slate-500 flex justify-center  items-center">
        <a
          href="#"
          className="flex flex-crow items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-3xl max-h-96 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 my-5 p-5"
        >
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={selectedMovie[0].hinhAnh}
            alt="movie hinh anh"
          />
          <div className="flex flex-col justify-between p-4 leading-normal text-center">
            <h5 className=" text-5xl font-bold tracking-tight text-gray-900 dark:text-white my-4">
              {selectedMovie[0].tenPhim}
            </h5>
            <p className="mb-3 font-normal text-xl text-gray-700 dark:text-gray-400 ">
              {selectedMovie[0].moTa}
            </p>
          </div>
        </a>
      </div>
    );
  }
};

export default MovieDetail;
