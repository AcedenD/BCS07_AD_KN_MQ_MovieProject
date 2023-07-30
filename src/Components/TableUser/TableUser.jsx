import React, { useRef, useState } from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/slices/nguoiDungSlice";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { Input, message, Popconfirm, Button } from "antd";

// id, ho ten, email, sdt, ma loai nguoi dung, action

const TableUser = (props) => {
  const { users } = useSelector((state) => state.nguoiDung);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const confirm = (e) => {
    console.log(e);
    nguoiDungServ
      .deleteUser(e.taiKhoan)
      .then((res) => {
        // alert("delete successful");
        messageApi.success("Xoá thành công");
        dispatch(getAllUser());
      })
      .catch((err) => {
        console.log(err);
        // alert("There is a problem deleting");
        messageApi.error("Xoá thất bại");
      });
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Không xoá nữa");
  };

  // console.log(props);
  console.log(users);

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
          <Popconfirm
            title="Xác nhận xoá?"
            description="Bạn có chắc muốn xoá người dùng này?"
            onConfirm={() => {
              confirm(record);
            }}
            onCancel={cancel}
            okText="Xoá"
            cancelText="Không"
            okType="danger"
          >
            <button
              className="py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 duration-500"
              // create a Popconfirm to ensure user dont accidentally delete user
              // onClick={() => {
              //   confirm(record);
              // }}
            >
              Xoá
            </button>
          </Popconfirm>

          <button
            className="py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 duration-500"
            onClick={() => {
              props.showDrawer();
              props.changeToVisible();
              // console.log(record);
              props.loadUser(record);
            }}
          >
            Sửa
          </button>
        </Space>
      ),
    },
  ];

  let newUser = users.map((item, index) => {
    return {
      ...item,
      id: index + 1,
    };
  });

  return (
    <div>
      {contextHolder}
      <Table
        className="w-fit"
        columns={columns}
        dataSource={newUser.length > 0 && newUser}
        messageApi={messageApi}
      />
    </div>
  );
};

export default TableUser;
