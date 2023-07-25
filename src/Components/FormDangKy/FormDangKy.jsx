import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { useDispatch } from "react-redux";
import { getAllUser } from "../../redux/slices/nguoiDungSlice";
import { addUserSchema } from "../../utils/addUserSchema";
import { Input, message } from "antd";

const FormDangKy = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP00",
      hoTen: "",
      maLoaiNguoiDung: "KhachHang",
    },
    onSubmit: async (values) => {
      try {
        console.log("trying to dang ky");
        console.log(values);
        // nguoiDungServ.addUser(values);
        const res = await nguoiDungServ.dangKy(values);
        console.log(res);
        dispatch(getAllUser());
        messageApi.success("dang nhap thanh cong");
        formik.resetForm();
      } catch (error) {
        console.log(error);
        messageApi.error(err.response.data.content);
      }
    },

    // add validation using yup from yup library
    validationSchema: addUserSchema,
  });

  const { handleSubmit, handleChange, values, errors } = formik;

  const userTester = {
    taiKhoan: "tester01",
    matKhau: "tester01",
    email: "tester01@gmail.com",
    soDt: "123123",
    maNhom: "GP01",
    maLoaiNguoiDung: "QuanTri",
    hoTen: "Tester",
  };
  useEffect(() => {
    // formik.setValues(userTester);
    // formik.setFieldValue('taiKhoan', 'Nguyen123');
    console.log(values);
    console.log(errors);
  }, [values]);

  return (
    <div>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div class="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            type="text"
            name="hoTen"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={values.hoTen}
          />
          <label
            for="hoTen"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Họ tên
          </label>
          {formik.errors.hoTen && formik.touched.hoTen ? (
            <p className=" text-red-600">{formik.errors.hoTen}</p>
          ) : (
            ""
          )}
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            type="text"
            name="email"
            id="email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={values.email}
          />
          <label
            for="email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <p className=" text-red-600">{formik.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            type="password"
            name="matKhau"
            id="matKhau"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={values.matKhau}
          />
          <span
            onClick={() => {
              if (document.getElementById("matKhau").type == "password") {
                document.getElementById("matKhau").type = "text";
                document.getElementById("eye").classList.remove("fa-eye");
                document.getElementById("eye").classList.add("fa-eye-slash");
              } else {
                document.getElementById("matKhau").type = "password";
                document.getElementById("eye").classList.remove("fa-eye-slash");
                document.getElementById("eye").classList.add("fa-eye");
              }
            }}
            class="absolute right-0 top-0 mt-3 mr-4 text-gray-500 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-600 transition-colors duration-400"
            style={{ cursor: "pointer" }}
          >
            <i class="fa-regular fa-eye" id="eye"></i>
          </span>

          <label
            for="matKhau"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mật khẩu
          </label>
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className=" text-red-600">{formik.errors.matKhau}</p>
          ) : (
            ""
          )}
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              onChange={handleChange}
              type="text"
              name="soDt"
              id="soDt"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={values.soDt}
            />
            <label
              for="soDt"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số Đt
            </label>
            {formik.errors.soDt && formik.touched.soDt ? (
              <p className=" text-red-600">{formik.errors.soDt}</p>
            ) : (
              ""
            )}
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              onChange={handleChange}
              type="text"
              name="taiKhoan"
              id="taiKhoan"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={values.taiKhoan}
            />
            <label
              for="taiKhoan"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tài khoản
            </label>
            {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
              <p className=" text-red-600">{formik.errors.taiKhoan}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Thêm người dùng
        </button>
      </form>
    </div>
  );
};

export default FormDangKy;
