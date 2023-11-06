import formatDate from "../../../lib/formatDate";

import BlogText from "./BlogText";
import LikeButton from "../others/LikeButton";
import CommentButton from "../others/CommentButton";
import NameForBlog from "./NameForBlog";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Blog as BlogTemplate } from "./BlogClientSide";

type BlogType = {
  blog: Blog;
  userName?: string;
};

// Seperate blog template
const Blog = async ({ blog, userName }: BlogType) => {
  const { img: blogImg } = blog;
  const { name } = blog.user;

  return (
    <BlogTemplate blogId={blog._id} name={name} userName={userName as string}>
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
    </BlogTemplate>
  );
};

// Container of seperate blog (will render content, user and title)
async function BlogContainer({ blog, userName }: BlogType) {
  const { img: blogImg, title, content, createdAt, likes, comments } = blog;
  const { name } = blog.user;
  const { day, month }: formattedDateType = formatDate(createdAt);

  return (
    <>
      <NameForBlog
        name={name || (userName as string)}
        day={day}
        month={month}
      />

      <div className="flex flex-col gap-0.5 font-medium">
        <p className="text-blue-300">{title}</p>
        <BlogText content={content} />
        {blogImg && <p>Blog Img</p>}
      </div>

      <div className="flex gap-5 text-sm">
        <LikeButton likes={likes} />
        <CommentButton comments={comments} />
      </div>
    </>
  );
}

export default Blog;
