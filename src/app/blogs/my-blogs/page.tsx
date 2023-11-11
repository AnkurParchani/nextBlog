import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SubNav from "@/components/nav/SubNav";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import Container from "@/components/others/Container";
import TopLogo from "@/components/others/TopLogo";
import BookIcon from "@mui/icons-material/Book";
import EmptyBlogList from "@/components/blogs/EmptyBlogList";

import { getLikedBlogs, getMyBlogs } from "../../../../utils/blogs/apiBlogs";
import { BlogWithoutLink } from "@/app/users/blogs/BlogWithoutLink";
import { getUser } from "../../../../utils/auth/getUser";
import Image from "next/image";

const page = async () => {
  const blogs = await getMyBlogs();
  const { _id: userId, img: userImg } = await getUser();
  const hasBlogs = blogs.length > 0;

  // Fetching and setting all liked blogs of user
  const fetchUserLikedBlogs = (await getLikedBlogs()).blogs;
  let userLikedBlogs: string[];
  if (!fetchUserLikedBlogs || fetchUserLikedBlogs[0] === null) {
    userLikedBlogs = [];
  } else {
    userLikedBlogs = fetchUserLikedBlogs.map((blog) => blog._id);
  }

  return (
    <div>
      <TopLogo showBackButton />
      <AddBlogIcon />
      <SubNav heading="My-Blogs" />

      <Container>
        {hasBlogs ? (
          <div className="grid grid-cols-1 gap-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-[#111] px-3 py-4 rounded-xl flex gap-2 items-start overflow-x-scroll"
              >
                {userImg ? (
                  <Image
                    src={userImg}
                    alt="user-img"
                    height={30}
                    width={30}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <AccountCircleIcon className="text-4xl text-gray-400" />
                )}

                <div className="flex-grow">
                  <BlogWithoutLink
                    userId={userId}
                    userLikedBlogs={userLikedBlogs}
                    blog={blog}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyBlogList
            content="Your posted Blogs will stay here"
            linkTo="/add-blog"
            linkContent="Post a Blog"
            icon={<BookIcon className="text-9xl text-blue-400" />}
          />
        )}
      </Container>
    </div>
  );
};

export default page;
