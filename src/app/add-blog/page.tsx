import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import Form from "./Form";
import TopLogo from "@/components/others/TopLogo";

const page = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <TopLogo showBackButton />
      <SubNav heading="Add a new Blog" />

      <Container>
        <Form />
      </Container>
    </div>
  );
};

export default page;
