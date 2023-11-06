"use client";
import { useSelector } from "react-redux";

import BottomNav from "@/components/nav/BottomNav";
import SubNav from "@/components/nav/SubNav";
import TopLogo from "@/components/others/TopLogo";

import { OvalSpinner } from "../../utils/others/Spinner";
import { getTitle } from "../../lib/SubNavSlice";

const Loading = () => {
  const title = useSelector(getTitle);

  return (
    <>
      <TopLogo backLinkTo="/" />

      <SubNav heading={title || "Loading"} />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/3">
        <OvalSpinner />
      </div>

      <BottomNav />
    </>
  );
};

export default Loading;
