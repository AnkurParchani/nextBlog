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
            <div
              key={blog._id}
              className="bg-[#111] px-3 py-4 rounded-xl flex gap-2 items-start"
            >
              {userImg ? (
                <Image
                  src={userImg}
                  alt="user-img"
                  className="rounded-full w-8 h-8"
                  height={300}
                  width={300}
                />
              ) : (
                <AccountCircleIcon
                  style={{ fontSize: "40px", color: "#9CA3AF" }}
                />
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
