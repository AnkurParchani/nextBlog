import Link from "next/link";

import NameForBlog from "@/components/blogs/NameForBlog";
import BlogText from "@/components/blogs/BlogText";
import CommentButton from "@/components/others/CommentButton";
import LikeButton from "@/components/others/LikeButton";

import formatDate from "../../../../lib/formatDate";

// Template for the Blog (container which will render whole info about a particular blog)
export function BlogWithoutLink({ blog }: { blog: Blog }) {
  const {
    title,
    likes,
    content,
    createdAt,
    isGlobal,
    comments,
    _id: blogId,
  } = blog;
  const { day, month }: formattedDateType = formatDate(createdAt);

  return (
    <div className="flex flex-col gap-1">
      <NameForBlog name={title} blueTitle month={month} day={day} />
      {!isGlobal && (
        <p className="text-slate-500 font-semibold text-xs -mt-1">(Private)</p>
      )}
      <BlogText content={content} />

      <div className="flex text-sm gap-4 mt-3">
        <LikeButton likes={likes} />
        <Link href={`/blogs/${blogId}`}>
          <CommentButton comments={comments} />
        </Link>
      </div>
    </div>
  );
}
