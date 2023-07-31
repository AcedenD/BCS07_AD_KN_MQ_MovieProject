import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { luuXuongLocal } from "../../utils/localStore";
import { useNavigate } from "react-router-dom";

const FormLoginAdmin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      console.log(values);
      nguoiDungServ
        .dangNhap(values)
        .then((res) => {
          console.log(res);
          // check user role, maLoaiNguoiDung
          if (res.data.content.maLoaiNguoiDung == "QuanTri") {
            luuXuongLocal("user", res.data.content);
            setTimeout(() => {
              navigate("/admin");
            }, 1000);
          } else {
            alert("You are not admin");
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
          // when account is not in server
          alert("Account doesn't exist or incorrect");
          // clear form
          formik.resetForm();
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
  return (
    <div>
      <h2 className="font-bold text-2xl mb-5">Login Admin</h2>

      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tài khoản
          </label>
          <input
            type="text"
            id="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập họ tên"
            // formik.values
            value={formik.values.taiKhoan}
          />
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p className="text-red-600">{formik.errors.taiKhoan}</p>
          ) : (
            <></>
          )}
        </div>
        <div>
          <label
            htmlFor="matKhau"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="matKhau"
            onChange={formik.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập mật khẩu"
            value={formik.values.matKhau}
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="text-red-600">{formik.errors.matKhau}</p>
          ) : (
            <></>
          )}
        </div>
        <button
          type="submit"
          className="py-1 px-3 rounded bg-green-700 text-white"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default FormLoginAdmin;
