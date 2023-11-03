import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import Form from "./Form";
import TopLogo from "@/components/others/TopLogo";
import { OvalSpinner } from "../../../utils/others/Spinner";

const page = () => {
  return (
    <>
      <TopLogo backLinkTo="/" />
      <SubNav heading="Add a new Blog" />

      <Container>
        <Form />
      </Container>
    </>
  );
};

export default page;
