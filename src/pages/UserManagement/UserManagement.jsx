import React, { useEffect, useState } from "react";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser } from "../../redux/slices/nguoiDungSlice";
import TableUser from "../../Components/TableUser/TableUser";
import { Drawer } from "antd";
import FormAddUser from "../../Components/FormAddUser/FormAddUser";
import FormEditUser from "../../Components/FormEditUser/FormEditUser";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.nguoiDung);

  useEffect(() => {
    // nguoiDungServ
    //   .getAllUser()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    dispatch(getAllUser());
  }, [dispatch]);

  // console.log(users);

  // MIDDLE WARE

  // redux-thunk is a middleware that execute before dispatch to store
  // redux-saga

  // cac data ve Drawer from antdesign
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("right");
  const showDrawer = () => {
    setOpen(true);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Edit Drawer 
  const showEditDrawer = () => {
    setEditDrawerVisible(true);
  };
  const onCloseEditDrawer = () => {
    setEditDrawerVisible(false);
  };
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);

  return (
    <div>
      <button
        className=" bg-green-600 text-white py-2 px-5 rounded-lg mb-5"
        onClick={showDrawer}
      >
        Thêm mới
      </button>
      <Drawer
        title="Thêm người dùng"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        size="large"
      >
        <FormAddUser />
      </Drawer>
      {/* Edit Drawer  */}
      <Drawer
        title="Sửa người dùng"
        placement={placement}
        width={500}
        onClose={onCloseEditDrawer}
        open={editDrawerVisible}
        size="large"
      >
        <FormEditUser />
      </Drawer>
      <TableUser showEditDrawer={showEditDrawer} />
    </div>
  );
};

export default UserManagement;
