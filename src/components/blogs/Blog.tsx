import formatDate from "../../../lib/formatDate";

import BlogText from "./BlogText";
import LikeButton from "../others/LikeButton";
import CommentButton from "../others/CommentButton";
import NameForBlog from "./NameForBlog";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Blog as BlogTemplate } from "./BlogClientSide";
import Image from "next/image";

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

// Container of seperate blog (will render content, user and title)
async function BlogContainer({
  blog,
  userName,
  userLikedBlogs,
  userBlog,
}: BlogType) {
  const {
    img: blogImg,
    title,
    content,
    createdAt,
    likes,
    comments,
    _id: blogId,
  } = blog;
  const { name } = blog.user;
  const { day, month }: formattedDateType = formatDate(createdAt);

  return (
    <>
      <NameForBlog
        name={name || (userName as string)}
        day={day}
        month={month}
      />

      {userBlog && (
        <p className="text-slate-500 font-semibold text-xs -mt-2">(You)</p>
      )}

      <div className="flex flex-col gap-0.5 font-medium">
        <p className="text-blue-300">{title}</p>
        <BlogText content={content} />
        {blogImg && (
          <Image
            src={blogImg}
            alt="blog-img"
            width={1000}
            height={1000}
            className="w-full h-auto mt-5"
          />
        )}
      </div>

      <div className="flex gap-5 text-sm mt-3">
        <LikeButton
          userLikedBlogs={userLikedBlogs}
          blogId={blogId}
          likes={likes}
        />
        <CommentButton comments={comments} />
      </div>
    </>
  );
}

export default Blog;
