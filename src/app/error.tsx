"use client"; // Error components must be Client Components
import BottomNav from "@/components/nav/BottomNav";
import Container from "@/components/others/Container";
import TopLogo from "@/components/others/TopLogo";
import AdbIcon from "@mui/icons-material/Adb";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <TopLogo showBackButton />
      <Container>
        <div className="flex items-center gap-5 flex-col">
          <AdbIcon style={{ fontSize: "120px", color: "#5397e6" }} />
          <h2 className="text-xl">
            <span className="text-blue-300 font-semibold">Oops...</span>{" "}
            Something went wrong!
          </h2>
          <div className="flex gap-3 text-sm">
            <button
              className="bg-gray-200 text-black py-1.5 px-5 rounded-md"
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Try again
            </button>{" "}
            <button
              className="bg-blue-400 text-black py-1.5 px-5 rounded-md"
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => router.back()
              }
            >
              Go back
            </button>
          </div>
        </div>
      </Container>
      <BottomNav />
    </>
  );
}
