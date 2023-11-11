"use client";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useEffect } from "react";
import { RingSpinner } from "../../../utils/others/Spinner";
import { logout } from "@/actions/user";
import { useRouter } from "next/navigation";

type SignoutType = {
  setAction: Dispatch<SetStateAction<string>>;
};

const Signout = ({ setAction }: SignoutType) => {
  const router = useRouter();

  useEffect(() => {
    async function signout() {
      const data = logout();

      if (data) {
        setAction("");
        toast.success("Logged out successfully");
        router.push("/");
      }
    }

    signout();
  }, [router, setAction]);

  return (
    <>
      <div className="fixed top-0 z-40 bottom-0 h-full bg-black opacity-70 blur-lg inset-x-0" />
      <div className="z-50 flex justify-center fixed top-48 left-1/2 -translate-x-1/2">
        <RingSpinner height="50" width="50" />
      </div>
    </>
  );
};

export default Signout;
