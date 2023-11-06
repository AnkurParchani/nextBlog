import AddBlogIcon from "@/components/others/AddBlogIcon";
import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import Blog from "@/components/blogs/Blog";
import TopLogo from "@/components/others/TopLogo";

import { getBlogs } from "../../utils/blogs/apiBlogs";

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <main>
      <TopLogo />
      <AddBlogIcon />
      <SubNav heading="Home" />

      <Container>
        <div className="grid grid-cols-1 gap-3">
          {blogs.map((blog: Blog) => (
            <Blog key={blog._id} blog={blog} />
          ))}
        </div>
      </Container>
    </main>
  );
}
