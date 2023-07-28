import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllMovie } from '../../redux/slices/movieSlice';
import TableMovie from '../../Components/Table Movie/TableMovie';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();



  useEffect(() =>{
dispatch(getAllMovie())
},[dispatch]);


return (<div ><TableMovie/> </div>)
}
export default MovieManagement