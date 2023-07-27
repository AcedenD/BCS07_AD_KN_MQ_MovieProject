import React, { useRef } from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { getAllUser } from "../../redux/slices/nguoiDungSlice";

// id, ho ten, email, sdt, ma loai nguoi dung, action

const TableUser = ({ showEditDrawer })  => {
  const { users } = useSelector((state) => state.nguoiDung);
  const dispatch = useDispatch();
  
  // console.log(users);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // custom lai cai hien thi cot, change the style
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Hộ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số ĐT",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Loại người dùng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      render: (text, record, index) => {
        // text store the value of data
        // console.log(text);
        // record store the object that associate with value
        // console.log(record);
        // index of data
        // console.log(index);
        // text == "QuanTri" ? "Quản Trị" : "Khách Hàng"
        return (
          <Tag color={text == "QuanTri" ? "magenta" : "blue"}>
            {text == "QuanTri" ? "Quản Trị" : "Khách Hàng"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 duration-500"
            // create a Popconfirm to ensure user dont accidentally delete user
            onClick={() => {
              nguoiDungServ
                .deleteUser(record.taiKhoan)
                .then((res) => {
                  alert("delete successful");
                  dispatch(getAllUser());
                })
                .catch((err) => {
                  console.log(err);
                  alert("There is a problem deleting");
                });
            }}
          >
            Xoá
          </button>
          <button className="py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 duration-500"
          onClick={() => {
            showEditDrawer();
          }}>
            Sửa
          </button>
        </Space>
      ),
    },
  ];
  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //     tags: ["nice", "developer"],
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //     tags: ["loser"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  // ];

  let newUser = users.map((item, index) => {
    return {
      ...item,
      id: index + 1,
    };
  });

  return <Table columns={columns} dataSource={newUser.length > 0 && newUser} />;
};

export default TableUser;
