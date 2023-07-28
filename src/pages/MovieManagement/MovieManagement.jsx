import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovie } from '../../redux/slices/movieSlice';
import TableMovie from '../../Components/Table Movie/TableMovie';
import FormAddMovie from '../../Components/FormAddMovie/FormAddMovie';
import AdminSearch from '../../Components/AdminSearch/AdminSearch';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (value) => {
    setSearchKeyword(value);
  };

  useEffect(() => {
    dispatch(getAllMovie())
  }, [dispatch]);


  return (<div >
    <FormAddMovie />
    <AdminSearch onSearch={handleSearch} />
    <TableMovie searchKeyword={searchKeyword}  /> </div>)
}
export default MovieManagement