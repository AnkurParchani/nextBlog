import AddBlogIcon from "@/components/others/AddBlogIcon";
import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import Blog from "@/components/blogs/Blog";
import TopLogo from "@/components/others/TopLogo";

import { getBlogs, getLikedBlogs } from "../../utils/blogs/apiBlogs";

export default async function Home() {
  const blogs = await getBlogs();
  const fetchUserLikedBlogs = (await getLikedBlogs()).blogs;
  const userLikedBlogs =
    fetchUserLikedBlogs[0] === null
      ? []
      : fetchUserLikedBlogs.map((blog) => blog._id);

  return (
    <main>
      <TopLogo />
      <AddBlogIcon />
      <SubNav heading="Home" />

      <Container>
        <div className="grid grid-cols-1 gap-3">
          {blogs.map((blog: Blog) => (
            <Blog key={blog._id} userLikedBlogs={userLikedBlogs} blog={blog} />
          ))}
        </div>
      </Container>
    </main>
  );
}
