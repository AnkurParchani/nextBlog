import AddBlogIcon from "@/components/AddBlogIcon";
import SubNav from "@/components/nav/SubNav";
import { getBlogs } from "../../utils/blogs/apiBlogs";

export default async function Home() {
  const data = await getBlogs();
  console.log(data);

  return (
    <main>
      <AddBlogIcon />
      <SubNav name="Liked Blogs" />
      <h1>This is the checking line</h1>
    </main>
  );
}
