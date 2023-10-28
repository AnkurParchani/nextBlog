import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import Form from "./Form";

const page = () => {
  return (
    <div>
      <SubNav heading="Login" />
      <Container>
        <Form />
      </Container>
    </div>
  );
};

export default page;
