"use client";

import { useDispatch, useSelector } from "react-redux";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ActionBox from "@/app/my-profile/ActionBox";

import { getTheme, setTheme } from "../../../utils/slices/UiSlice";

const ThemeActionBox = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(getTheme);

  function handleClick() {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
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
              <WbSunnyIcon
                style={{
                  fontSize: "30px",
                  lineHeight: "36px",
                  color: "#fff",
                }}
              />
            ) : (
              <DarkModeIcon
                style={{
                  fontSize: "30px",
                  lineHeight: "36px",
                  color: "#111",
                }}
              />
            )
          }
          heading="change theme"
        />
      </div>
    </>
  );
};
export default ThemeActionBox;
