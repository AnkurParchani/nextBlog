"use client";
import { ColorRing, Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { getTheme } from "../slices/UiSlice";

export const RingSpinner = ({
  height,
  width,
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <ColorRing
      visible={true}
      height={height || "23"}
      width={width || "23"}
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
    />
  );
};

export const OvalSpinner = () => {
  const theme = useSelector(getTheme);

  return (
    <Oval
      height={40}
      width={40}
      color="#fff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor={theme === "dark" ? "#1d9bf0" : "#000"}
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
