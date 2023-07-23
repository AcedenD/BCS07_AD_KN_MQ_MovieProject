import React from "react";
import { layDuLieuLocal, xoaDuLieuLocal } from "../../utils/localStore";

const UserProfile = () => {
  const user = layDuLieuLocal("user");
  console.log(user);

  return (
    <div className="flex justify-center items-center">
      <div className="relative overflow-x-auto flex justify-center flex-col gap-3">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tài khoản
              </th>
              <th scope="col" className="px-6 py-3">
                Họ tên
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Mã loại người dùng
              </th>
              <th scope="col" className="px-6 py-3">
                Mã nhóm
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.taiKhoan}
              </th>
              <td className="px-6 py-4">{user.hoTen}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.soDT}</td>
              <td
                className="px-6 py-4"
                style={{
                  color: user.maLoaiNguoiDung == "QuanTri" ? "magenta" : "blue",
                }}
              >
                {user.maLoaiNguoiDung == "QuanTri" ? "Quản Trị" : "Khách Hàng"}
              </td>
              <td className="px-6 py-4">{user.maNhom}</td>
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => {
            xoaDuLieuLocal("user");
            window.location.href = "/";
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
