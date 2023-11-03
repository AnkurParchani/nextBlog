import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import Form from "./Form";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <SubNav heading="Login" />

      <Container>
        <Form />
        <p className="text-sm text-center mt-5">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </Container>
    </div>
  );
};

export default page;
