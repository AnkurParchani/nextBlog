"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../lib/SubNavSlice";

import Link from "next/link";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";
import Signout from "./Signout";

type ActionBoxType = {
  heading: string;
  actionType?: string;
  subNavTitle?: string;
  user?: User;
  linkHref?: string;
  icon: React.ReactNode;
};

function ActionBox({
  heading,
  user,
  icon,
  subNavTitle,
  actionType,
  linkHref,
}: ActionBoxType) {
  const dispatch = useDispatch();
  const [action, setAction] = useState<string>("");

  return (
    <>
      {linkHref ? (
        <Link
          onClick={() => dispatch(setTitle(subNavTitle))}
          href={linkHref}
          className="bg-[#111] cursor-pointer flex gap-3 items-center text-white rounded-md px-4 py-4"
        >
          {icon}
          <p>{heading}</p>
        </Link>
      ) : (
        <div
          onClick={() => setAction(actionType || "")}
          className="bg-[#111] cursor-pointer flex gap-3 items-center text-white rounded-md px-4 py-4"
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
