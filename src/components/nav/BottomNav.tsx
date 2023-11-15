"use client";

import { useEffect } from "react";
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
  getBottomNavUserImg,
  getTheme,
  setBottomNavLink,
  setBottomNavUserImg,
} from "../../../utils/slices/UiSlice";
import Image from "next/image";
import { getLoggedInUser } from "@/actions/user";

const BottomNav = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userImg = useSelector(getBottomNavUserImg);
  const value = useSelector(getBottomNavLink);
  const theme = useSelector(getTheme);

  const hoverColor =
    theme === "dark" ? "hover:bg-gray-900" : "hover:bg-gray-300";
  const iconColor = theme === "dark" ? "#fff" : "#111";

  useEffect(() => {
    async function getUser() {
      const { img } = await getLoggedInUser();
      dispatch(setBottomNavUserImg(img || undefined));
    }

    getUser();
  }, [dispatch]);

  return (
    <div className="fixed bottom-0 inset-x-0 border-t border-gray-900">
      <Box>
        <BottomNavigation
          showLabels
          style={{
            backgroundColor: `${theme === "dark" ? "#000" : "#E5E7EB"}`,
          }}
        >
          <BottomNavigationAction
            className={`${value === "/" ? "" : hoverColor}`}
            icon={
              <HomeRoundedIcon
                style={
                  value === "/" ? { color: "#66b2ff" } : { color: iconColor }
                }
              />
            }
            onClick={() => {
              dispatch(setTitle("Home"));
              dispatch(setBottomNavLink("/"));
              router.push("/");
            }}
          />

          <BottomNavigationAction
            className={`${value === "/search" ? "" : hoverColor}`}
            icon={
              <SearchIcon
                style={
                  value === "/search"
                    ? { color: "#66b2ff" }
                    : { color: iconColor }
                }
              />
            }
            onClick={() => {
              dispatch(setTitle("Search"));
              dispatch(setBottomNavLink("/search"));
              router.push("/search");
            }}
          />

          <BottomNavigationAction
            className={`  ${value === "/fav" ? "" : hoverColor}`}
            icon={
              <FavoriteIcon
                style={
                  value === "/fav" ? { color: "#66b2ff" } : { color: iconColor }
                }
              />
            }
            onClick={() => {
              dispatch(setTitle("My liked Blogs "));
              dispatch(setBottomNavLink("/fav"));
              router.push("/blogs/liked-blogs");
            }}
          />

          <BottomNavigationAction
            className={`${value === "/profile" ? "" : hoverColor}`}
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
                <AccountCircleIcon
                  style={
                    value === "/profile"
                      ? { color: "#66b2ff" }
                      : { color: iconColor }
                  }
                />
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
