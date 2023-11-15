import Link from "next/link";

import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import Form from "./Form";
import TopLogo from "@/components/others/TopLogo";

const page = () => {
  return (
    <div className="max-w-md mx-auto">
      <TopLogo />
      <SubNav heading="Sign up" />
      <Container>
        <Form />

        <p className="text-sm text-center mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </Container>
    </div>
  );
};

export default page;
