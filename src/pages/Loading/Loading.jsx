import React from "react";
import Lottie from "react-lottie";
import * as loadingAnimation from "../../assets/animation/animation_loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className=" w-full h-full flex items-center fixed bg-white "
      style={{ zIndex: "9999" }}
    >
      <Lottie options={defaultOptions} height={500} width={500} />
    </div>
  );
};

export default Loading;
