"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { setTitle } from "../../../utils/slices/SubNavSlice";
import { setBottomNavLink } from "../../../utils/slices/UiSlice";

// The Main Website's logo button
export const Logo = () => {
  const dispatch = useDispatch();

  function handleLogoClick() {
    dispatch(setTitle("Home"));
    dispatch(setBottomNavLink("/"));
  }

  return (
    <div className="mx-auto">
      <Link href="/" onClick={handleLogoClick}>
        <Image
          width={50}
          height={50}
          alt="logo"
          className="h-9 w-auto"
          src="/nb-logo.png"
        />
      </Link>
    </div>
  );
};

// To show the top right user icon link to go and see seperate user's blogs
export const AccountIcon = ({
  userId,
  userImg,
}: {
  userId: string;
  userImg?: string;
}) => {
  const dispatch = useDispatch();

  function handleAccountClick() {
    dispatch(setBottomNavLink(""));
    dispatch(setTitle("Blogs"));
  }

  return (
    <Link onClick={handleAccountClick} href={`/users/blogs?userId=${userId}`}>
      {userImg ? (
        <Image
          src={userImg}
          alt="user-img"
          height={30}
          width={30}
          className="rounded-full h-6 w-6"
        />
      ) : (
        <AccountCircleIcon
          style={{ fontSize: "30px", color: "#D1D5DB" }}
          className="text-3xl text-gray-300"
        />
      )}
    </Link>
  );
};
