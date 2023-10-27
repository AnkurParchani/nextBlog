import Image from "next/image";

function TopLogo() {
  return (
    <div className="bg-black flex justify-center py-1.5">
      <Image width={32} height={32} alt="logo" src="/nb-logo.png" />
    </div>
  );
}

export default TopLogo;
