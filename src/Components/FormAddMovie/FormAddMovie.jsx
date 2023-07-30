import React from 'react'
import { Form, Input, DatePicker, Switch, Upload, Button, Col, Row, Space, message  } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
// import * as Yup from "yup";
import { movieServ } from '../../services/movieServices';
import { getAllMovie } from '../../redux/slices/movieSlice';
import { useDispatch } from 'react-redux';


//

const FormAddMovie = ({formData}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();


  // //Yup
  // const validationSchema = Yup.object().shape({
  //   maPhim: Yup.number()
  //     .typeError('Mã Phim must be a number')
  //     .positive('Mã Phim must be a positive number')
  //     .integer('Mã Phim must be an integer')
  //     .min(10000, 'Mã Phim must be at least 5 digits')
  //     .max(99999, 'Mã Phim must be at most 5 digits')
  //     .required('Mã Phim is required'),
  //   ngayKhoiChieu: Yup.date().min(new Date(), 'Ngày Khởi Chiếu must be today or a future date').required('Ngày Khởi Chiếu is required'),
  //   dangChieu: Yup.boolean().oneOf([true, false], 'You must select either Đang Chiếu or Sắp Chiếu').required('Đang Chiếu is required'),
  //   sapChieu: Yup.boolean().oneOf([true, false], 'You must select either Đang Chiếu or Sắp Chiếu').required('Sắp Chiếu is required'),
  //   danhGia: Yup.number().typeError('Đánh Giá must be a number').min(1, 'Đánh Giá must be at least 1').max(10, 'Đánh Giá must be at most 10').required('Đánh Giá is required'),
  // });


  //Formik
  const formik = useFormik({
    initialValues: {

      maPhim: "",
      tenPhim: "",
      moTa: "",
      ngayKhoiChieu: "",
      maNhom: "",
      dangChieu: "",
      sapChieu: "",
      hot: "",
      danhGia: "",
      hinhAnh: "",

      
    },
    onSubmit: async (values) => {
      console.log(values);
      try{
        const res = await movieServ.addMovie(values);
        messageApi.success("Thêm Phim Thành Công");
        dispatch(getAllMovie());
        formik.resetForm();}
        catch (error) {
          formik.resetForm();
        }
      

      //   messageApi.success("Thêm Phim Thành Công");
      //   dispatch(getAllMovie());
      //   formik.resetForm();
      // } catch (error) {
      //   messageApi.error(error.response.data.content);
      //   formik.resetForm();
      // }
    },
    // validationSchema: validationSchema,
  });

const{handleSubmit, handleChange, values} =formik

  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="w-full">
          <label htmlFor="maPhim" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã Phim</label>
          <input value={values.maPhim}
              onChange={handleChange}
              type="text"
              name="maPhim"
              placeholder="Xin Nhập Mã Phim"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
        </div>
        <div className="w-full">
          <label htmlFor="tenPhim" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên Phim</label>
          <input 
          value={values.tenPhim}
          onChange={handleChange}
          type="text" 
          name="tenPhim"
          id="tenPhim"
          placeholder="Xin Nhập Tên Phim"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
        </div>
        <div className="sm:col-span-2">
  <label htmlFor="ngayKhoiChieu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Ngày Khởi Chiếu
  </label>
  <input
    value={values.ngayKhoiChieu}
    onChange={handleChange}
    type="date"
    name="ngayKhoiChieu"
    id="ngayKhoiChieu"
    placeholder="Xin Nhập Ngày Khởi Chiếu"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
  />
</div>
<div className="sm:col-span-2">
  <label htmlFor="maNhom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã Nhóm</label>
  <select
    value={values.maNhom}
    onChange={handleChange}
    name="maNhom"
    id="maNhom"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
  >
    <option value="GP01">GP01</option>
    <option value="GP02">GP02</option>
    <option value="GP03">GP03</option>
    <option value="GP03">GP04</option>
    <option value="GP03">GP05</option>
    <option value="GP03">GP06</option>
    <option value="GP03">GP07</option>
    <option value="GP03">GP08</option>
    <option value="GP03">GP09</option>
    <option value="GP10">GP10</option>
  </select>
</div>
<div className="w-full flex items-center">
  <label htmlFor="dangChieu" className="me-2 flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Đang Chiếu
  </label>
  <input
    checked={values.dangChieu}
    onChange={(e) => {
      handleChange(e);
      formik.setFieldValue('dangChieu', e.target.checked);
    }}
    type="checkbox"
    name="dangChieu"
    id="dangChieu"
    className="form-checkbox h-5 w-5 text-primary-600 dark:text-primary-400"
  />


  <label htmlFor="sapChieu" className="me-2 ms-5 flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Sắp Chiếu
  </label>
  <input
    checked={values.sapChieu}
    onChange={(e) => {
      handleChange(e);
      formik.setFieldValue('sapChieu', e.target.checked);
    }}
    type="checkbox"
    name="sapChieu"
    id="sapChieu"
    className="form-checkbox h-5 w-5 text-primary-600 dark:text-primary-400"
  />


  <label htmlFor="hot" className="me-2 flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white ms-5">
    Hot
  </label>
  <input
    checked={values.hot}
    onChange={(e) => {
      handleChange(e);
      formik.setFieldValue('hot', e.target.checked);
    }}
    type="checkbox"
    name="hot"
    id="hot"
    className="form-checkbox h-5 w-5 text-primary-600 dark:text-primary-400"
  />
</div>

<div className="w-full">
  <label htmlFor="hinhAnh" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Hình ảnh
  </label>
  <div className="relative">
    <input
      type="file"
      accept="image/*"
      name="hinhAnh"
      id="hinhAnh"
      onChange={handleChange}
      className="hinhAnh"
    />
   
  </div>
</div>

<div className="sm:col-span-2">
          <label htmlFor="danhGia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Đánh Giá (1-10)</label>
          <input 
          value={values.danhGia}
          onChange={handleChange}
          type="number" name="danhGia" id="danhGia" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="moTa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô Tả</label>
          <textarea 
          value={values.moTa}
          onChange={handleChange}
          id="moTa" rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Mô tả nội dung phim" defaultValue={""} />
        </div>
        
      </div>
      <button type="submit" className="bg-green-600 px-5 py-2 text-white rounded-lg mt-4 mb-5 hover:bg-green-800">
        Add Movie
      </button>

      <button type="submit" className="ms-2 bg-orange-600 px-5 py-2 text-white rounded-lg mt-4 mb-5 hover:bg-orange-800">

        Cập Nhật
      </button>
    </form>
  )
}

export default FormAddMovie