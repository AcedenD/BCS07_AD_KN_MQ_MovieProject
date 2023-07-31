import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { useDispatch } from "react-redux";
import { getAllUser } from "../../redux/slices/nguoiDungSlice";
import { addUserSchema } from "../../utils/addUserSchema";
import { Input, message } from "antd";

const FormAddUser = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

  // console.log(props);
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    hoTen: yup.string().required("Họ tên không được bỏ trống"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được bỏ trống"),
    matKhau: yup.string().required("Mật khẩu không được bỏ trống"),
    soDt: yup.string().required("Số điện thoại không được bỏ trống"),
    taiKhoan: yup.string().required("Tài khoản không được bỏ trống"),
    maLoaiNguoiDung: yup.string().required("Chọn loại người dùng"),
    maNhom: yup.string().required("Mã nhóm không được bỏ trống"),
  });
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        // nguoiDungServ.addUser(values);
        const res = await nguoiDungServ.addUser(values);
        console.log(res);
        messageApi.success("them nguoi dung thanh cong");
        dispatch(getAllUser());
        formik.resetForm();
      } catch (error) {
        console.log(error);
        messageApi.error(
          error.response.data.content
            ? error.response.data.content
            : "Please reload before adding user"
        );
        formik.resetForm();
      }
    },

    // add validation using yup from yup library
    validationSchema: addUserSchema,
  });

  const handleThemNguoi = async (values) => {
    console.log("them nguoi");
    try {
      console.log(values);
      // nguoiDungServ.addUser(values);
      const res = await nguoiDungServ.addUser(values);
      console.log(res);
      messageApi.success("Thêm người dùng thành công");
      dispatch(getAllUser());
      formik.resetForm();
    } catch (error) {
      console.log(error);
      messageApi.error(error.response.data.content);
      formik.resetForm();
    }
  };

  const handleCapNhat = async (values) => {
    console.log("cap nhat");
    try {
      console.log(values);
      // event.preventDefault();
      // nguoiDungServ.addUser(values);
      const res = await nguoiDungServ.updateUser(values);
      console.log(res);
      messageApi.success("Cập nhật người dùng thành công");
      dispatch(getAllUser());
      formik.resetForm();
    } catch (error) {
      console.log(error);
      messageApi.error(error.response.data.content);
      formik.resetForm();
    }
  };

  const { handleSubmit, handleChange, values, errors, handleBlur } = formik;

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
    // console.log(values);
    // console.log(props.user);
    const selectedUser = props.user;
    formik.setValues(selectedUser);
    if (Object.keys(selectedUser) != 0) {
      // console.log("setting maNhom");
      formik.setFieldValue("maNhom", "GP03");
    }
  }, [props.user]);

  useEffect(() => {
    // console.log(values);
    // console.log(errors);
  }, [values]);

  useEffect(() => {
    // console.log(props.open);
    if (!props.open) {
      formik.resetForm();
    }
  }, [props.open]);

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
            onBlur={handleBlur}
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
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:bg-slate-400 disabled:cursor-not-allowed"
            placeholder=" "
            value={values.matKhau}
            disabled={props.visible}
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
            class="absolute right-0 top-0 mt-3 mr-4 text-gray-500 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-600 transition-colors duration-400 "
          >
            <i class="fa-regular fa-eye" id="eye"></i>
          </span>

          <label
            for="matKhau"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  "
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
              name="soDT"
              id="soDT"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={values.soDT}
            />
            <label
              for="soDT"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số Đt
            </label>
            {formik.errors.soDT && formik.touched.soDT ? (
              <p className=" text-red-600">{formik.errors.soDT}</p>
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
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:bg-slate-400 disabled:cursor-not-allowed"
              placeholder=" "
              value={values.taiKhoan}
              disabled={props.visible}
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
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <label
              for="maNhom"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Mã nhóm
            </label>
            <select
              onChange={handleChange}
              name="maNhom"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={values.maNhom}
            >
              <option value="" disabled>
                Chọn nhóm
              </option>
              <option value="GP01">GP01</option>
              <option value="GP02">GP02</option>
              <option value="GP03">GP03</option>
              <option value="GP04">GP04</option>
              <option value="GP05">GP05</option>
              <option value="GP06">GP06</option>
              <option value="GP07">GP07</option>
              <option value="GP08">GP08</option>
              <option value="GP09">GP09</option>
              <option value="GP10">GP10</option>
            </select>
            {formik.errors.maNhom && formik.touched.maNhom ? (
              <p className=" text-red-600">{formik.errors.maNhom}</p>
            ) : (
              ""
            )}
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <label
              for="maLoaiNguoiDung"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Chọn loại người dùng
            </label>
            <select
              onChange={handleChange}
              name="maLoaiNguoiDung"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={values.maLoaiNguoiDung}
            >
              <option value="" disabled>
                Chọn loại người dùng
              </option>
              <option value="QuanTri">Quản trị</option>
              <option value="KhachHang">Khách hàng</option>
            </select>
            {formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung ? (
              <p className=" text-red-600">{formik.errors.maLoaiNguoiDung}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3"
          // onClick={() => {
          //   handleThemNguoi(values);
          // }}
        >
          Thêm người dùng
        </button>
        <button
          type="button"
          class="text-black bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled={!props.visible}
          style={{
            cursor: props.visible ? "pointer" : "not-allowed",
          }}
          onClick={() => {
            handleCapNhat(values);
          }}
        >
          Cập Nhật
        </button>
      </form>
    </div>
  );
};

export default FormAddUser;
