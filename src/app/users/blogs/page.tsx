import TopLogo from "@/components/others/TopLogo";
import { serverApi } from "../../../../lib/globals";
import { getBlogsOfSingleUser } from "../../../../utils/blogs/apiBlogs";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";

const page = async ({
  searchParams: { userId },
}: {
  searchParams: { userId: string };
}) => {
  const data = await getBlogsOfSingleUser(userId);
  console.log("Data of blogs of single user", data);

  // Render blogs of particular user
  return (
    <div>
      <TopLogo backLinkTo="/" />
      <AddBlogIcon />
      <SubNav heading="Add a title here" />

      <Container>
        <p>Img</p>
        <p>name</p>
        <div>Some content</div>
      </Container>
    </div>
  );
};

export default page;
