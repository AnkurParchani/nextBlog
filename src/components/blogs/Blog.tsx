import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import formatDate from "../../../lib/formatDate";
import LikeAndComment from "./LikeAndComment";

type BlogType = {
  blog: Blog;
};

const Blog = async ({ blog }: BlogType) => {
  const { img: blogImg } = blog;

  return (
    <div className=" bg-[#111] px-3 py-4 rounded-xl">
      <div className="flex gap-2">
        {blogImg ? (
          <h1>User Img</h1>
        ) : (
          <AccountCircleIcon className="text-gray-400 text-4xl" />
        )}
        <div className="flex flex-col gap-2">
          <BlogContent blog={blog} />
        </div>
      </div>
    </div>
  );
};

export default Blog;

async function BlogContent({ blog }: BlogType) {
  const { img: blogImg, title, content, createdAt, likes, comments } = blog;
  const { name } = blog.user;
  const { day, month }: formattedDateType = formatDate(createdAt);

  return (
    <>
      <div className="flex items-center gap-1">
        <p className="text-gray-100 font-semibold">{name}</p>
        <p className="text-gray-500 -mt-1.5">.</p>
        <p className="text-gray-500 text-sm">
          {month} {day}
        </p>
      </div>

      <div className="flex flex-col gap-0.5 font-medium">
        <p>{title}</p>
        <p className="text-sm font-light">{content}</p>
        {blogImg && <p>Blog Img</p>}
      </div>

      <LikeAndComment likes={likes} comments={comments} />
    </>
  );
}
