"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";
import { setTitle } from "../../../lib/SubNavSlice";
import { useState } from "react";

function ActionBox({
  heading,
  icon,
  subNavTitle,
  actionType,
  linkHref,
}: {
  heading: string;
  actionType?: string;
  subNavTitle?: string;
  linkHref?: string;
  icon: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [action, setAction] = useState<string>("");

  return (
    <>
      {linkHref ? (
        <Link
          onClick={() => dispatch(setTitle(subNavTitle))}
          href={linkHref}
          className="bg-[#111] flex gap-3 items-center text-white rounded-md px-4 py-4"
        >
          {icon}
          <p>{heading}</p>
        </Link>
      ) : (
        <div
          onClick={() => setAction(actionType || "")}
          className="bg-[#111] flex gap-3 items-center text-white rounded-md px-4 py-4"
        >
          {icon}
          <p>{heading}</p>
        </div>
      )}

      {action === "deleteAccount" && <DeleteAccount setAction={setAction} />}
      {action === "editProfile" && <EditProfile />}
    </>
  );
}
export default ActionBox;
