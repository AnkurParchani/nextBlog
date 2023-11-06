"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { setTitle } from "../../../lib/SubNavSlice";

// The Main Website's logo button
export const Logo = () => {
  const dispatch = useDispatch();

  return (
    <div className="mx-auto">
      <Link href="/" onClick={() => dispatch(setTitle("Home"))}>
        <Image width={32} height={32} alt="logo" src="/nb-logo.png" />
      </Link>
    </div>
  );
};

// To show the top right user icon link to go and see seperate user's blogs
export const AccountIcon = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();

  return (
    <Link
      onClick={() => dispatch(setTitle("Blogs"))}
      href={`/users/blogs?userId=${userId}`}
    >
      <AccountCircleIcon className="text-3xl text-gray-300" />
    </Link>
  );
};
