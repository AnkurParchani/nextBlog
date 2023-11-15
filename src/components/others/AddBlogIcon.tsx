"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../utils/slices/SubNavSlice";
import { setBottomNavLink } from "../../../utils/slices/UiSlice";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

// The Plus button
const AddBlogIcon = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookie] = useCookies();

  function handleClick() {
    if (!cookie.token) {
      return router.push("/login");
    }
    dispatch(setBottomNavLink(""));
    dispatch(setTitle("Add A New Blog"));
    router.push("/add-blog");
  }

  return (
    <button
      className="bg-[#1d9bf0] hover:bg-[#41acf4] duration-100 z-30 rounded-full p-2.5 fixed right-4 bottom-16 text-white"
      onClick={handleClick}
    >
      <AddRoundedIcon style={{ fontSize: "30px" }} />
    </button>
  );
};

export default AddBlogIcon;
