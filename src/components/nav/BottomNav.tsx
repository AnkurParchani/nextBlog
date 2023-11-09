"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../lib/slices/SubNavSlice";
import { getTheme } from "../../../lib/slices/UiSlice";

const BottomNav = () => {
  const [value, setValue] = useState("/");
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  const iconColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <div className="fixed bottom-0 inset-x-0 border-t border-gray-900">
      <Box>
        <BottomNavigation
          className={`${theme === "dark" ? "bg-[black]" : "bg-gray-200"}`}
          showLabels
        >
          <BottomNavigationAction
            className={`hover:bg-gray-900 ${
              value === "/" ? "text-[#66B2FF]" : iconColor
            }`}
            icon={<HomeRoundedIcon />}
            onClick={() => {
              dispatch(setTitle("Home"));
              setValue("/");
              router.push("/");
            }}
          />

          <BottomNavigationAction
            className={`hover:bg-gray-900  ${
              value === "/search" ? "text-[#66B2FF]" : iconColor
            }`}
            icon={<SearchIcon />}
            onClick={() => {
              dispatch(setTitle("Search for Users or Blogs"));
              setValue("/search");
            }}
          />

          <BottomNavigationAction
            className={`hover:bg-gray-900  ${
              value === "/fav" ? "text-[#66B2FF]" : iconColor
            }`}
            icon={<FavoriteIcon />}
            onClick={() => {
              dispatch(setTitle("My liked Blogs "));
              setValue("/fav");
              router.push("/blogs/liked-blogs");
            }}
          />

          <BottomNavigationAction
            className={`hover:bg-gray-900  ${
              value === "/profile" ? "text-[#66B2FF]" : iconColor
            }`}
            icon={<AccountCircleIcon />}
            onClick={() => {
              dispatch(setTitle("My-Profile"));
              router.push("/my-profile");
              setValue("/profile");
            }}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
};

export default BottomNav;
