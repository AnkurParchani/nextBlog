import Link from "next/link";

import NameForBlog from "@/components/blogs/NameForBlog";
import BlogText from "@/components/blogs/BlogText";
import CommentButton from "@/components/others/CommentButton";
import LikeButton from "@/components/others/LikeButton";

import formatDate from "../../../../lib/formatDate";
import EditMenuButton from "@/components/others/EditMenuButton";

// Template for the Blog (container which will render whole info about a particular blog)
export function BlogWithoutLink({
  blog,
  userLikedBlogs,
  userId,
}: {
  blog: Blog;
  userLikedBlogs?: string[];
  userId?: string;
}) {
  const {
    title,
    likes,
    content,
    createdAt,
    isGlobal,
    comments,
    user: blogUserId,
    _id: blogId,
  } = blog;
  const { day, month }: formattedDateType = formatDate(createdAt);

  return (
    <div className="flex flex-col gap-1 relative">
      <NameForBlog name={title} blueTitle month={month} day={day} />

      {String(blogUserId) === String(userId) && (
        <div className="absolute -right-2 -top-2">
          <EditMenuButton blog={blog} />
        </div>
      )}

      {!isGlobal && (
        <p className="text-slate-500 font-semibold text-xs -mt-1">(Private)</p>
      )}

      <BlogText content={content} />

      <div className="flex text-sm gap-4 mt-3">
        <LikeButton
          blogId={blogId}
          userLikedBlogs={userLikedBlogs}
          likes={likes}
        />

        <Link href={`/blogs/${blogId}`}>
          <CommentButton comments={comments} />
        </Link>
      </div>
    </div>
  );
}
