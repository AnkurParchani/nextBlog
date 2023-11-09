import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AccountIcon, Logo } from "./TopLogoClientSide";

function TopLogo({
  backLinkTo,
  showUserIcon,
  userId,
}: {
  backLinkTo?: string;
  showUserIcon?: boolean;
  userId?: string;
}) {
  return (
    <div className="fixed top-0 left-0 w-full bg-black flex items-center z-30 px-4 py-1.5">
      {backLinkTo && (
        <Link href={backLinkTo}>
          <ArrowBackIcon className="text-2xl text-gray-300" />
        </Link>
      )}

      <Logo />

      {showUserIcon && userId && <AccountIcon userId={userId} />}
    </div>
  );
}

export default TopLogo;
