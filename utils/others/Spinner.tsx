"use client";
import { ColorRing, Oval } from "react-loader-spinner";

export const RingSpinner = () => {
  return (
    <ColorRing
      visible={true}
      height="23"
      width="33"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
    />
  );
};

export const OvalSpinner = () => {
  return (
    <Oval
      height={40}
      width={40}
      color="#fff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#1d9bf0"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
