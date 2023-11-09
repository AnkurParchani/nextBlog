"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AccountIcon, Logo } from "./TopLogoClientSide";
import { useRouter } from "next/navigation";

function TopLogo({
  showBackButton,
  showUserIcon,
  userId,
}: {
  showBackButton?: boolean;
  showUserIcon?: boolean;
  userId?: string;
}) {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-black flex items-center z-30 px-4 py-1.5">
      {showBackButton && (
        <div onClick={handleClick}>
          <ArrowBackIcon className="text-2xl text-gray-300" />
        </div>
      )}

      <Logo />

      {showUserIcon && userId && <AccountIcon userId={userId} />}
    </div>
  );
}

export default TopLogo;
