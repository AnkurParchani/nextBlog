"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../utils/slices/SubNavSlice";

import Link from "next/link";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";
import Signout from "./Signout";
import { getTheme, setBottomNavLink } from "../../../utils/slices/UiSlice";

type ActionBoxType = {
  heading: string;
  actionType?: string;
  subNavTitle?: string;
  user?: User;
  linkHref?: string;
  icon: React.ReactNode;
  bottomNavValue?: string;
};

function ActionBox({
  heading,
  user,
  icon,
  subNavTitle,
  bottomNavValue,
  actionType,
  linkHref,
}: ActionBoxType) {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const [action, setAction] = useState<string>("");

  return (
    <>
      {linkHref ? (
        <Link
          onClick={() => {
            dispatch(setBottomNavLink(bottomNavValue));
            dispatch(setTitle(subNavTitle));
          }}
          href={linkHref}
          className={`${
            theme === "dark" ? "bg-[#111] text-white" : "bg-gray-300 text-black"
          } cursor-pointer flex gap-3 items-center rounded-md font-medium px-4 py-4`}
        >
          {icon}
          <p>{heading}</p>
        </Link>
      ) : (
        <div
          onClick={() => {
            dispatch(setBottomNavLink(bottomNavValue));
            setAction(actionType || "");
          }}
          className={`${
            theme === "dark" ? "bg-[#111] text-white" : "bg-gray-300 text-black"
          } cursor-pointer flex gap-3 items-center rounded-md font-medium px-4 py-4`}
        >
          {icon}
          <p>{heading}</p>
        </div>
      )}

      {action === "deleteAccount" && <DeleteAccount setAction={setAction} />}

      {action === "editProfile" && (
        <EditProfile user={user as User} setAction={setAction} />
      )}

      {action === "signout" && <Signout setAction={setAction} />}
    </>
  );
}
export default ActionBox;
