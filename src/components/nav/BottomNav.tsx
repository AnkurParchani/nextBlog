"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

import { setTitle } from "../../../utils/slices/SubNavSlice";
import {
  getBottomNavLink,
  getTheme,
  setBottomNavLink,
} from "../../../utils/slices/UiSlice";
import { getLoggedInUser } from "@/actions/user";
import Image from "next/image";

const BottomNav = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const value = useSelector(getBottomNavLink);
  const theme = useSelector(getTheme);
  const [userImg, setUserImg] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getUser() {
      const { img } = await getLoggedInUser();
      setUserImg(img || undefined);
    }

    getUser();
  }, []);

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
              dispatch(setBottomNavLink("/"));
              router.push("/");
            }}
          />

          <BottomNavigationAction
            className={`hover:bg-gray-900  ${
              value === "/search" ? "text-[#66B2FF]" : iconColor
            }`}
            icon={<SearchIcon />}
            onClick={() => {
              dispatch(setTitle("Search"));
              dispatch(setBottomNavLink("/search"));
              router.push("/search");
            }}
          />

          <BottomNavigationAction
            className={`hover:bg-gray-900  ${
              value === "/fav" ? "text-[#66B2FF]" : iconColor
            }`}
            icon={<FavoriteIcon />}
            onClick={() => {
              dispatch(setTitle("My liked Blogs "));
              dispatch(setBottomNavLink("/fav"));
              router.push("/blogs/liked-blogs");
            }}
          />

          <BottomNavigationAction
            className={`hover:bg-gray-900  ${
              value === "/profile" ? "text-[#66B2FF]" : iconColor
            }`}
            icon={
              userImg ? (
                <Image
                  src={userImg}
                  width={25}
                  height={25}
                  className="rounded-full max-h-7 w-auto"
                  alt="user-img"
                />
              ) : (
                <AccountCircleIcon />
              )
            }
            onClick={() => {
              dispatch(setTitle("My-Profile"));
              dispatch(setBottomNavLink("/profile"));
              router.push("/my-profile");
            }}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
};

export default BottomNav;
