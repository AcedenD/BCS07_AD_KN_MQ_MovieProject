import React, { useEffect } from "react";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser } from "../../redux/slices/nguoiDungSlice";

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
  }, []);

  console.log(users);

  // MIDDLE WARE

  // redux-thunk is a middleware that execute before dispatch to store
  // redux-saga

  return <div>UserManagement</div>;
};

export default UserManagement;
