import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Blog as BlogTemplate } from "./BlogClientSide";
import Image from "next/image";
import BlogContainer from "./BlogContainer";

type BlogType = {
  blog: Blog;
  userName?: string;
  userLikedBlogs?: string[];
  userId?: string;
  userBlog?: boolean;
};

// Seperate blog template
const Blog = async ({ blog, userName, userLikedBlogs, userId }: BlogType) => {
  const { name, _id: blogUserId, img: userImg } = blog.user;

  return (
    <BlogTemplate blogId={blog._id} name={name} userName={userName as string}>
      <div className="flex gap-2">
        {userImg ? (
          <Image
            src={userImg}
            alt="user-img"
            height={300}
            width={300}
            className="rounded-full h-8 w-8"
          />
        ) : (
          <AccountCircleIcon
            style={{
              fontSize: "2.25rem",
              lineHeight: "2.5rem",
              color: "#9CA3AF",
            }}
          />
        )}
        <div className="flex flex-col gap-2 flex-grow">
          <BlogContainer
            userLikedBlogs={userLikedBlogs}
            blog={blog}
            userName={userName}
            userBlog={String(blogUserId) === String(userId)}
          />
        </div>
      </div>
    </BlogTemplate>
  );
};

export default Blog;
