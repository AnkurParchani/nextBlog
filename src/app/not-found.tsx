import Link from "next/link";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import TopLogo from "@/components/others/TopLogo";
import Container from "@/components/others/Container";

export default function NotFound() {
  return (
    <>
      <TopLogo showBackButton />
      <Container>
        <div className="flex items-center gap-5 flex-col">
          <SearchOffIcon style={{ fontSize: "120px", color: "#5397e6" }} />

          <h2 className="text-xl">
            <span className="text-blue-300 font-semibold">Oops...</span> Could
            not find requested resource
          </h2>
          <Link
            href="/"
            className="bg-gray-200 text-black py-1.5 px-5 rounded-md"
          >
            Return Home
          </Link>
        </div>
      </Container>
    </>
  );
}
