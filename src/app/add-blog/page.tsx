import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import Form from "./Form";

const page = () => {
  return (
    <>
      <SubNav heading="Add a new Blog" />
      <Container>
        <Form />
      </Container>
    </>
  );
};

export default page;
