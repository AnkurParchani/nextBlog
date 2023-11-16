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
import Image from "next/image";
import { useSelector } from "react-redux";
import { getTheme } from "../../../../utils/slices/UiSlice";
import Blog from "./Blog";

const page = async ({
  searchParams: { userId },
}: {
  searchParams: { userId: string };
}) => {
  const blogs = await getBlogsOfSingleUser(userId);

  const { name: userName, email: userEmail, img: userImg } = blogs[0].user;

  // Fetching and setting all liked blogs of user
  const fetchUserLikedBlogs = (await getLikedBlogs()).blogs;
  let userLikedBlogs: string[];
  if (!fetchUserLikedBlogs || fetchUserLikedBlogs[0] === null) {
    userLikedBlogs = [];
  } else {
    userLikedBlogs = fetchUserLikedBlogs.map((blog: Blog) => blog._id);
  }

  // Render blogs of particular user
  return (
    <div>
      <TopLogo showBackButton />
      <AddBlogIcon />
      <SubNav heading="Blogs" />

      <Container>
        <ProfileIntro
          userPhoto={userImg}
          userName={userName}
          userEmail={userEmail}
        />

        <div className="grid max-w-5xl lg:grid-cols-3 mx-auto grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 auto-rows-auto items-start content-start mt-5">
          {blogs.map((blog: Blog) => (
            <Blog
              key={blog._id}
              blog={blog}
              userImg={userImg}
              userLikedBlogs={userLikedBlogs}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default page;
