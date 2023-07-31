import React, { useEffect, useState } from 'react'
import { Form, Input, DatePicker, Switch, Upload, Button, Col, Row, Space, message  } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { addMovieSchema } from "../../utils/addMovieSchema";
import { Formik, useFormik } from 'formik';
import { movieServ } from '../../services/movieServices';
import { getAllMovie } from '../../redux/slices/movieSlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

function FormEditMovie() {
    const [moviePhim, setMoviePhim] = useState([]);
    const location = useLocation();
          const searchParams = new URLSearchParams(location.search);
          const maPhim = searchParams.get('movieId');

          useEffect(() => {
            movieServ.getMovieDetail(maPhim)
              .then((res) => {
                console.log(res);
                setMoviePhim(res.data.content);
              })
              .catch((err) => {
                console.log(err);
              });
          }, [maPhim]);
        
        //   useEffect(() => {
        //     // Set the form values after fetching the movie data
        //     formik.setValues({
        //       maPhim: moviePhim.maPhim || "",
        //       tenPhim: moviePhim.tenPhim || "",
        //       moTa: moviePhim.moTa || "",
        //       ngayKhoiChieu: moviePhim.ngayKhoiChieu || "",
        //       maNhom: "GP03",
        //       dangChieu: moviePhim.dangChieu || false,
        //       sapChieu: moviePhim.sapChieu || false,
        //       hot: moviePhim.hot || false,
        //       danhGia: moviePhim.danhGia || 0,
        //     });
        //   }, [moviePhim]);

    const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {

        maPhim: moviePhim.maPhim ,
        tenPhim: moviePhim.tenPhim ,
        moTa: moviePhim.moTa ,
        maNhom: "GP03",
        dangChieu: moviePhim.dangChieu,
        sapChieu: moviePhim.sapChieu,
        hot: moviePhim.hot,
        danhGia: moviePhim.danhGia ,
    },
    onSubmit: async (values) => {
      console.log(values)

      let formData = new FormData();
      for(let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
      } else {
          formData.append('hinhAnh', formik.values.hinhAnh, formik.values.hinhAnh.name);
      }
      }
      console.log('formData', formData.get('key'));


      try{
        const res = await movieServ.updateMovie(formData);
        messageApi.success("Cập Nhập Thành Công");
        dispatch(getAllMovie());
        formik.resetForm();}
        catch (error) {
          messageApi.error(
            error.response.data.content
              ? error.response.data.content
              : "Không hợp lệ"
          );
          formik.resetForm();
        }
    },
    // validationSchema: addMovieSchema,
  });
  const handleChangeFile =(e) =>{
    let file  = e.target.files[0];
    console.log ('file',file);
  //  return (file) =>{formik.setFieldValue('hinhAnh',file)}
  formik.setFieldValue('hinhAnh',file)
  }
const{handleSubmit, handleChange, values} =formik
  return (
    <>
    {contextHolder}
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="w-full">
          <label htmlFor="maPhim" className="block mb-2 text-sm font-medium text-gray-900 ">Mã Phim</label>
          <input value={formik.values.maPhim}
              onChange={handleChange}
              type="text"
              name="maPhim"
              placeholder="Xin Nhập Mã Phim"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"/>
        </div>
        <div className="w-full">
          <label htmlFor="tenPhim" className="block mb-2 text-sm font-medium text-gray-900">Tên Phim</label>
          <input 
          value={formik.values.tenPhim}
          onChange={handleChange}
          type="text" 
          name="tenPhim"
          id="tenPhim"
          placeholder="Xin Nhập Tên Phim"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
        </div>
        <div className="sm:col-span-2">
 
</div>

<div className="w-full flex items-center">
  <label htmlFor="dangChieu" className="me-2 flex items-center mb-2 text-sm font-medium text-gray-900">
    Đang Chiếu
  </label>
  <Switch
    checked={formik.values.dangChieu}
    onChange={(value)=>{formik.setFieldValue('dangChieu',value)}}
    name="dangChieu"
    id="dangChieu"
    className="form-checkbox h-5 w-5 text-primary-600 "
  />


  <label htmlFor="sapChieu" className="me-2 ms-5 flex items-center mb-2 text-sm font-medium text-gray-900">
    Sắp Chiếu
  </label>
  <Switch

checked={formik.values.sapChieu}
    onChange={(value)=>{formik.setFieldValue('sapChieu',value)}}
    name="sapChieu"
    id="sapChieu"
    className="form-checkbox h-5 w-5 text-primary-600 "
  />


  <label htmlFor="hot" className="me-2 ms-3 flex items-center mb-2 text-sm font-medium text-gray-900">
    Hot
  </label>
  <Switch
    checked={formik.values.hot}
    onChange={(value)=>{formik.setFieldValue('hot',value)}}
    name="hot"
    id="hot"
    className="form-checkbox h-5 w-5 text-primary-600 "
  />
</div>


<div className="sm:col-span-2">
          <label htmlFor="danhGia" className="block mb-2 text-sm font-medium text-gray-900">Đánh Giá (0-10)</label>
          <input 
          value={formik.values.danhGia}
          min={0}
          max={10}
          onChange={handleChange}
          type="number" name="danhGia" id="danhGia" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"/>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="moTa" className="block mb-2 text-sm font-medium text-gray-900 ">Mô Tả</label>
          <textarea 
          value={formik.values.moTa}
          onChange={handleChange}
          id="moTa" rows={5} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Mô tả nội dung phim" defaultValue={""} />
        </div>
        
      </div>
      <button type="submit" className="bg-green-600 px-5 py-2 text-white rounded-lg mt-4 mb-5 hover:bg-green-800">
        Cập Nhật
      </button>

    </form></>
  )
}

export default FormEditMovie