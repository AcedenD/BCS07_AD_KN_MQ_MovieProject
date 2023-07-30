import React, { useEffect } from 'react'
import { Form, Input, DatePicker, Switch, Upload, Button, Col, Row, Space, message  } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { addMovieSchema } from "../../utils/addMovieSchema";
// import * as yup from "yup";
import { Formik, useFormik } from 'formik';
import { movieServ } from '../../services/movieServices';
import { getAllMovie } from '../../redux/slices/movieSlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';


const FormAddMovie = ({formData}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
const handleChangeDatePicker =(value) =>{
  let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
formik.setFieldValue('ngayKhoiChieu',ngayKhoiChieu)
}

  // //Yup
  // const validationSchema = yup.object().shape({
  //   maPhim: yup.number()
  //     .typeError('Mã Phim must be a number')
  //     .positive('Mã Phim must be a positive number')
  //     .integer('Mã Phim must be an integer')
  //     .min(10000, 'Mã Phim must be at least 5 digits')
  //     .max(99999, 'Mã Phim must be at most 5 digits')
  //     .required('Mã Phim is required'),
  //   ngayKhoiChieu: yup.date().min(new Date(), 'Ngày khởi chiếu phải ở tương lai'),
  //   danhGia: yup.number().typeError('Đánh Giá must be a number').min(1, 'Đánh Giá must be at least 1').max(10, 'Đánh Giá must be at most 10').required('Đánh Giá is required'),
  //   hinhAnh: yup.mixed().required('Please select a picture').test(
  //     'fileFormat',
  //     'Invalid file format',
  //     value => value && value.type.startsWith('image/'))
  // });

  //Formik
 
      
  const formik = useFormik({
    initialValues: {

    maPhim: formData.maPhim || "",
    tenPhim: formData.tenPhim || "",
    moTa: formData.moTa || "",
    ngayKhoiChieu: formData.ngayKhoiChieu || "",
    maNhom: "GP03",
    dangChieu: formData.dangChieu || false,
    sapChieu: formData.sapChieu || false,
    hot: formData.hot || false,
    danhGia: formData.danhGia || 0,
    hinhAnh:{}
    },
    onSubmit: async (values) => {
      console.log(values)

      let formData = new FormData();
      for(let key in values) {
        if (key!== 'hinhAnh'){
          formData.append (key, values[key]);
      } else{
        formData.append('file', values.hinhAnh, values.hinhAnh.name);
      }}
      console.log('formData', formData.get('File'));


      try{
        const res = await movieServ.addMovie(values);
        messageApi.success("Thêm Phim Thành Công");
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

  const capNhat = async () => {
    const values = formik.values;
    try {
      const res = await movieServ.updateMovie(values);
      messageApi.success("Cập nhật Phim Thành Công");
      dispatch(getAllMovie());
      formik.resetForm();
    } catch (error) {
      formik.resetForm();
    }
  };
  const handleChangeFile =(e) =>{
    let file  = e.target.files[0];
    console.log ('file',file);
   return (file) =>{formik.setFieldValue('hinhAnh',file)}
  }
const{handleSubmit, handleChange, values} =formik

  return <>
    {contextHolder}
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="w-full">
          <label htmlFor="maPhim" className="block mb-2 text-sm font-medium text-gray-900 ">Mã Phim</label>
          <input value={values.maPhim}
              onChange={handleChange}
              type="text"
              name="maPhim"
              placeholder="Xin Nhập Mã Phim"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"/>
        </div>
        <div className="w-full">
          <label htmlFor="tenPhim" className="block mb-2 text-sm font-medium text-gray-900">Tên Phim</label>
          <input 
          value={values.tenPhim}
          onChange={handleChange}
          type="text" 
          name="tenPhim"
          id="tenPhim"
          placeholder="Xin Nhập Tên Phim"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
        </div>
        <div className="sm:col-span-2">
  <label htmlFor="ngayKhoiChieu" className="block mb-2 text-sm font-medium text-gray-900">
    Ngày Khởi Chiếu
  </label>
  <DatePicker
           // Convert date to moment object for DatePicker
          format="DD/MM/YYYY" // Set the desired format for display
          name="ngayKhoiChieu"
          id="ngayKhoiChieu"
          placeholder="Xin Nhập Ngày Khởi Chiếu"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          onChange={handleChangeDatePicker}/>
</div>

<div className="w-full flex items-center">
  <label htmlFor="dangChieu" className="me-2 flex items-center mb-2 text-sm font-medium text-gray-900">
    Đang Chiếu
  </label>
  <Switch
    checked={values.dangChieu}
    onChange={(value)=>{formik.setFieldValue('dangChieu',value)}}
    name="dangChieu"
    id="dangChieu"
    className="form-checkbox h-5 w-5 text-primary-600 "
  />


  <label htmlFor="sapChieu" className="me-2 ms-5 flex items-center mb-2 text-sm font-medium text-gray-900">
    Sắp Chiếu
  </label>
  <Switch

    checked={values.sapChieu}
    onChange={(value)=>{formik.setFieldValue('sapChieu',value)}}
    name="sapChieu"
    id="sapChieu"
    className="form-checkbox h-5 w-5 text-primary-600 "
  />


  <label htmlFor="hot" className="me-2 ms-3 flex items-center mb-2 text-sm font-medium text-gray-900">
    Hot
  </label>
  <Switch
    checked={values.hot}
    onChange={(value)=>{formik.setFieldValue('hot',value)}}
    name="hot"
    id="hot"
    className="form-checkbox h-5 w-5 text-primary-600 "
  />
</div>

<div className="w-full">
  <label htmlFor="hinhAnh" className="block mb-2 text-sm font-medium text-gray-900 ">
    Hình ảnh
  </label>
  <div className="relative">
    <input
      type="file"
      accept="image/*"
      name="hinhAnh"
      id="hinhAnh"
      onChange={handleChangeFile}
    />
  </div>
  <img width={20} src="" alt="" />
</div>

<div className="sm:col-span-2">
          <label htmlFor="danhGia" className="block mb-2 text-sm font-medium text-gray-900">Đánh Giá (0-10)</label>
          <input 
          min={0}
          max={10}
          value={values.danhGia}
          onChange={handleChange}
          type="number" name="danhGia" id="danhGia" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"/>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="moTa" className="block mb-2 text-sm font-medium text-gray-900 ">Mô Tả</label>
          <textarea 
          value={values.moTa}
          onChange={handleChange}
          id="moTa" rows={5} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Mô tả nội dung phim" defaultValue={""} />
        </div>
        
      </div>
      <button type="submit" className="bg-green-600 px-5 py-2 text-white rounded-lg mt-4 mb-5 hover:bg-green-800">
        Add Movie
      </button>

      <button onClick={capNhat} type="submit" className="ms-2 bg-orange-600 px-5 py-2 text-white rounded-lg mt-4 mb-5 hover:bg-orange-800">

        Cập Nhật
      </button>
    </form></>
  
}

export default FormAddMovie