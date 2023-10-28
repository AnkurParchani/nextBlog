import Image from "next/image";

function TopLogo() {
  return (
    <div className="bg-black flex fixed top-0 inset-x-0 items-center gap-1 justify-center py-1.5">
      <Image width={32} height={32} alt="logo" src="/nb-logo.png" />
    </div>
  );
}

export default TopLogo;
