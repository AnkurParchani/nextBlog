"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../lib/SubNavSlice";

function ActionBox({
  action,
  icon,
  subNavTitle,
  linkHref,
}: {
  action: string;
  icon: React.ReactNode;
  subNavTitle?: string;
  linkHref?: string;
}) {
  const dispatch = useDispatch();

  return (
    <>
      {linkHref ? (
        <Link
          onClick={() => dispatch(setTitle(subNavTitle))}
          href={linkHref}
          className="bg-[#111] flex gap-3 items-center text-white rounded-md px-4 py-4"
        >
          {icon}
          <p>{action}</p>
        </Link>
      ) : (
        <div className="bg-[#111] flex gap-3 items-center text-white rounded-md px-4 py-4">
          {icon}
          <p>{action}</p>
        </div>
      )}
    </>
  );
}
export default ActionBox;
