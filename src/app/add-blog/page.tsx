import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import Form from "./Form";
import TopLogo from "@/components/others/TopLogo";

const page = () => {
  return (
    <>
      <TopLogo showBackButton />
      <SubNav heading="Add a new Blog" />

      <Container>
        <Form />
      </Container>
    </>
  );
};

export default page;
