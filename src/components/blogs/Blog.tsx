import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import formatDate from "../../../lib/formatDate";
import Link from "next/link";

import BlogText from "./BlogText";
import Likes from "../others/LikeButton";
import CommentButton from "../others/CommentButton";

type BlogType = {
  blog: Blog;
  userName?: string;
};

// Seperate blog template
const Blog = async ({ blog, userName }: BlogType) => {
  const { img: blogImg } = blog;

  return (
    <Link
      href={`/blogs/${blog._id}`}
      className="bg-[#111] px-3 py-4 rounded-xl"
    >
      <div className="flex gap-2">
        {blogImg ? (
          <h1>User Img</h1>
        ) : (
          <AccountCircleIcon className="text-gray-400 text-4xl" />
        )}
        <div className="flex flex-col gap-2">
          <BlogContainer blog={blog} userName={userName} />
        </div>
      </div>
    </Link>
  );
};

export default Blog;

// Container of seperate blog (will render content, user and title)
async function BlogContainer({ blog, userName }: BlogType) {
  const { img: blogImg, title, content, createdAt, likes, comments } = blog;
  const { name } = blog.user;
  const { day, month }: formattedDateType = formatDate(createdAt);

  return (
    <>
      <div className="flex items-center gap-1">
        <p className="text-gray-100 font-medium capitalize">
          {name || userName}
        </p>
        <p className="text-gray-500 -mt-1.5">.</p>
        <p className="text-gray-500 text-sm">
          {month} {day}
        </p>
      </div>

      <div className="flex flex-col gap-0.5 font-medium">
        <p className="text-blue-300">{title}</p>
        <BlogText content={content} />
        {blogImg && <p>Blog Img</p>}
      </div>

      <div className="flex gap-5 text-sm">
        <Likes likes={likes} />
        <CommentButton comments={comments} />
      </div>
    </>
  );
}
