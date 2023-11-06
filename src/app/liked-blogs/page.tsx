import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";

import TopLogo from "@/components/others/TopLogo";
import { getLikedBlogs } from "../../../utils/blogs/apiBlogs";
import Blog from "@/components/blogs/Blog";

const page = async () => {
  const { blogs, user } = await getLikedBlogs();

  return (
    <div>
      <TopLogo />
      <SubNav heading="My Liked Blogs" />

      <Container>
        <div className="grid grid-cols-1 gap-3">
          {blogs.map((blog: Blog) => (
            <Blog key={blog._id} blog={blog} userName={user.name} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default page;
