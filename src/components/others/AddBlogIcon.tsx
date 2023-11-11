"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { setTitle } from "../../../utils/slices/SubNavSlice";
import { setBottomNavLink } from "../../../utils/slices/UiSlice";

// The Plus button
const AddBlogIcon = () => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setBottomNavLink(""));
    dispatch(setTitle("Add A New Blog"));
  }

  return (
    <Link
      href="/add-blog"
      className="bg-[#1d9bf0] hover:bg-[#41acf4] duration-100 z-30 rounded-full p-2.5 fixed right-4 bottom-16 text-white"
      onClick={handleClick}
    >
      <AddRoundedIcon className="text-3xl" />
    </Link>
  );
};

export default AddBlogIcon;
