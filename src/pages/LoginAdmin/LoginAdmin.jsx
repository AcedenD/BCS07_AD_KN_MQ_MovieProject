import React, { useEffect } from "react";
import FormLoginAdmin from "../../Components/FormLoginAdmin/FormLoginAdmin";
import Lottie from "react-lottie";

import * as loginAnimation from "./../../assets/animation/animation_login.json";
import { layDuLieuLocal } from "../../utils/localStore";

const LoginAdmin = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    let user = layDuLieuLocal("user");
    if (user) {
      if (user.maLoaiNguoiDung == "QuanTri") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-1/2">
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
      <div className="w-1/2">
        <FormLoginAdmin />
      </div>
    </div>
  );
};

export default LoginAdmin;
