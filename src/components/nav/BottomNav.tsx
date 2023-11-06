"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

//////////////
// Track the value of current selected one so that when user changes the theme, it should not go to theme one and be on the selected one
//////////////

const BottomNav = () => {
  const [value, setValue] = useState("/");
  const router = useRouter();

  return (
    <div className="fixed bottom-0 inset-x-0 border-t border-gray-900">
      <Box>
        <BottomNavigation className="bg-[black]" showLabels>
          <BottomNavigationAction
            className={`hover:bg-gray-900 ${
              value === "/" ? "text-[#66B2FF]" : "text-white"
            }`}
            icon={<HomeRoundedIcon />}
            onClick={() => {
              setValue("/");
              router.push("/");
            }}
          />

          <BottomNavigationAction
            className={`hover:bg-gray-900  ${
              value === "/change-theme" ? "text-[#66B2FF]" : "text-white"
            }`}
            icon={<SearchIcon />}
            onClick={() => setValue("/change-theme")}
          />

          <BottomNavigationAction
            className={`hover:bg-gray-900  ${
              value === "/fav" ? "text-[#66B2FF]" : "text-white"
            }`}
            icon={<FavoriteIcon />}
            onClick={() => {
              setValue("/fav");
              router.push("/blogs/liked-blogs");
            }}
          />

          <BottomNavigationAction
            className={`hover:bg-gray-900  ${
              value === "/profile" ? "text-[#66B2FF]" : "text-white"
            }`}
            icon={<AccountCircleIcon />}
            onClick={() => {
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
