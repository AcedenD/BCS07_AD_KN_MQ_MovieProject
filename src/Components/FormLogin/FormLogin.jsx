import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, message } from "antd";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { luuXuongLocal } from "../../utils/localStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDuLieuHoTen } from "../../redux/slices/nguoiDungSlice";

const FormLogin = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // use to post values to server
      nguoiDungServ
        .dangNhap(values)
        .then((res) => {
          console.log(res);
          // if login sucess, save data to local
          messageApi.success("Login success");
          // khi lay du lieu thanh cong, gui len redux
          dispatch(setDuLieuHoTen(res.data.content));
          luuXuongLocal("user", res.data.content);
          setTimeout(() => {
            navigate("/");
          }, [800]);
        })
        .catch((err) => {
          console.log(err);
          messageApi.error(err.response.data.content);
        });
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("Please enter tài khoản"),
      matKhau: yup
        .string()
        .required("Please enter in password")
        .min(6, "enter in more than 6 "),
    }),
  });

  const { handleChange, handleSubmit, handleBlur } = formik;
  return (
    <div>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Tài khoản
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="taiKhoan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập tài khoản"
          />
          {/* <Input
            name="taiKhoan"
            onChange={handleChange}
            onBlur={handleBlur}
            status={
              formik.errors.taiKhoan && formik.touched.taiKhoan ? "error" : ""
            }
            placeholder="Nhập tài khoản"
          /> */}
          {/* // ở đây errors.taiKhoan giúp hiển thị lỗi  */}
          {/* nhưng gặp 1 vấn đề chỉ hiển thị lỗi khi người dùng đã sử dụng input đó, nên chúng ta cần check thêm touched của formik  */}
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p className=" text-red-600">{formik.errors.taiKhoan}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Mật khẩu
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            name="matKhau"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className=" text-red-600">{formik.errors.matKhau}</p>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
