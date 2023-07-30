import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovie } from '../../redux/slices/movieSlice';
import TableMovie from '../../Components/Table Movie/TableMovie';
import FormAddMovie from '../../Components/FormAddMovie/FormAddMovie';
import AdminSearch from '../../Components/AdminSearch/AdminSearch';
import { Drawer } from 'antd';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  
  const dispatch = useDispatch();
    //edit
    const [formData, setFormData] = useState({});
    const { phimData } = useSelector((state) => state.movies);
    const [values, setValues] = useState({});
    const loadMovie = (movie) => {
      setValues(movie);
    };

  useEffect(() => {
    dispatch(getAllMovie())
  }, [dispatch]);

  //SearchBar
 const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (value) => {
    setSearchKeyword(value);
  };

  //Drawers
  
  const [open, setOpen] = useState(false);

  const showDrawer = (movieData) => {
    setFormData(movieData);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setFormData({});
  };

  return (<div >
     <button
       className='bg-green-600 px-5 py-2 text-white rounded-lg mb-5 'onClick={showDrawer} >
      <i class="fa-solid fa-plus"></i>  Thêm Phim
      </button>
      <AdminSearch onSearch={handleSearch} />
    <TableMovie searchKeyword={searchKeyword} showDrawer={showDrawer} />
      <Drawer
        title="Phim"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}>
    <FormAddMovie formData={formData} movie={values} open={open}/>
    </Drawer>

     </div>)
}
export default MovieManagement