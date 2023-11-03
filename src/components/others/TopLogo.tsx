import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

function TopLogo({ backLinkTo }: { backLinkTo?: string }) {
  return (
    <div className="fixed top-0 left-0 w-full bg-black flex items-center px-4 py-1.5">
      {backLinkTo && (
        <Link href={backLinkTo}>
          <ArrowBackIcon className="text-2xl text-gray-300" />
        </Link>
      )}
      <div className="mx-auto">
        <Link href="/">
          <Image width={32} height={32} alt="logo" src="/nb-logo.png" />
        </Link>
      </div>
    </div>
  );
}

export default TopLogo;
