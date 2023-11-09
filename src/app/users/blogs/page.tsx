import TopLogo from "@/components/others/TopLogo";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileIntro from "@/components/others/ProfileIntro";

import {
  getBlogsOfSingleUser,
  getLikedBlogs,
} from "../../../../utils/blogs/apiBlogs";
import { BlogWithoutLink } from "./BlogWithoutLink";

const page = async ({
  searchParams: { userId },
}: {
  searchParams: { userId: string };
}) => {
  const blogs = await getBlogsOfSingleUser(userId);
  const { name: userName, email: userEmail } = blogs[0].user;

  // Fetching and setting all liked blogs of user
  const fetchUserLikedBlogs = (await getLikedBlogs()).blogs;
  let userLikedBlogs: string[];
  if (!fetchUserLikedBlogs || fetchUserLikedBlogs[0] === null) {
    userLikedBlogs = [];
  } else {
    userLikedBlogs = fetchUserLikedBlogs.map((blog) => blog._id);
  }

  // Render blogs of particular user
  return (
    <div>
      <TopLogo showBackButton />
      <AddBlogIcon />
      <SubNav heading="Blogs" />

      <Container>
        <ProfileIntro userName={userName} userEmail={userEmail} />

        <div className="grid grid-cols-1 gap-3 mt-5">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-[#111] px-3 py-4 rounded-xl flex gap-2 items-start"
            >
              {!blog.img && (
                <AccountCircleIcon className="text-4xl text-gray-400" />
              )}

              <BlogWithoutLink userLikedBlogs={userLikedBlogs} blog={blog} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default page;
