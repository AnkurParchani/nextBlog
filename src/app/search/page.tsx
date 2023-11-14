import TopLogo from "@/components/others/TopLogo";
import SubNav from "@/components/nav/SubNav";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import Container from "@/components/others/Container";
import { getBlogs } from "../../../utils/blogs/apiBlogs";
import { getAllUsers } from "../../../utils/users/apiUsers";
import SearchInput from "./SearchInput";

const page = async () => {
  const blogs = await getBlogs();
  if (blogs.error) return <p>Failed to get blogs... </p>;
  const users = await getAllUsers();

  return (
    <div>
      <TopLogo />
      <SubNav heading="Search" />
      <AddBlogIcon />

      <Container>
        <SearchInput blogs={blogs} users={users} />
      </Container>
    </div>
  );
};

export default page;
