import AddBlogIcon from "@/components/others/AddBlogIcon";
import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import Blog from "@/components/blogs/Blog";
import TopLogo from "@/components/others/TopLogo";

import { getBlogs, getLikedBlogs } from "../../utils/blogs/apiBlogs";
import NotFound from "./not-found";

export default async function Home() {
  // Getting all the blogs
  const blogs = await getBlogs();
  if (blogs && blogs.error) return <NotFound />;

  // Fetching and setting all liked blogs of user
  const fetchUserLikedBlogs = (await getLikedBlogs()).blogs;
  let userLikedBlogs: string[];
  if (!fetchUserLikedBlogs || fetchUserLikedBlogs[0] === null) {
    userLikedBlogs = [];
  } else {
    userLikedBlogs = fetchUserLikedBlogs.map((blog: Blog) => blog._id);
  }

  return (
    <main>
      <TopLogo />
      <AddBlogIcon />
      <SubNav heading="Home" />

      <Container>
        <div className="grid max-w-5xl lg:grid-cols-3 mx-auto grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 auto-rows-auto items-start content-start">
          {blogs.map((blog: Blog) => (
            <Blog key={blog._id} userLikedBlogs={userLikedBlogs} blog={blog} />
          ))}
        </div>
      </Container>
    </main>
  );
}
