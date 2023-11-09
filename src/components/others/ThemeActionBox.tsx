"use client";

import { useDispatch, useSelector } from "react-redux";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ActionBox from "@/app/my-profile/ActionBox";

import { getTheme, setTheme } from "../../../lib/slices/UiSlice";

const ThemeActionBox = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(getTheme);

  function handleClick() {
    dispatch(setTheme(currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <div
        className={`${currentTheme === "dark" ? "bg-white" : "bg-black"} h-0.5`}
      />
      <div onClick={handleClick}>
        <ActionBox
          actionType="changeTheme"
          bottomNavValue="/profile"
          icon={
            currentTheme === "dark" ? (
              <WbSunnyIcon className="text-3xl text-white" />
            ) : (
              <DarkModeIcon className="text-3xl text-gray-900" />
            )
          }
          heading="change theme"
        />
      </div>
    </>
  );
};
export default ThemeActionBox;
