import LikeButton from "@/components/others/LikeButton";
import formatDate from "../../../../lib/formatDate";
import NameForBlog from "@/components/blogs/NameForBlog";

import { AccountCircle } from "@mui/icons-material";
import CommentButton from "@/components/others/CommentButton";
import Image from "next/image";

// Blog Section
export function Blog({
  content,
  likes,
  name,
  hasCommentFunctionality,
  blogId,
  comments,
  userLikedBlogs,
}: {
  content: string;
  likes: number;
  hasCommentFunctionality?: boolean;
  comments: number;
  blogId: string;
  name: string;
  userLikedBlogs: string[];
}) {
  return (
    <div className="pb-12 pt-2 px-2.5 bg-slate-900 rounded-md">
      <p className="font-normal leading-relaxed tracking-wide">{content}</p>
      <div className="mt-5 flex justify-between px-1">
        <div className="flex gap-3">
          <LikeButton
            blogId={blogId}
            userLikedBlogs={userLikedBlogs}
            likes={likes}
          />
          <CommentButton
            blogId={blogId}
            hasCommentFunctionality
            comments={comments}
          />
        </div>
        <p className="text-blue-400 font-semibold uppercase text-sm tracking-wide">
          - {name}
        </p>
      </div>
    </div>
  );
}

// Intersection
export function InterSection() {
  return (
    <div className="flex justify-center items-end h-16 border-x-2 mx-2 border-blue-400">
      <span className="uppercase text-white">Comments</span>
    </div>
  );
}

// Comments section
type CommentType = {
  _id: string;
  isEdited: boolean;
  content: string;
  blog: string;
  user: User;
  createdAt: string;
};

export function Comment({ comment }: { comment: CommentType }) {
  const {
    isEdited,
    content,
    createdAt,
    user: { name, img: userImg },
  } = comment;

  const { month, day, year } = formatDate(createdAt);

  return (
    <>
      <div className="h-3 border-x-2 mx-2 border-blue-400"></div>
      <div className="pb-8 pt-2 px-2.5 bg-slate-900 rounded-md">
        {/* If no image of the user */}
        <div className="flex gap-2">
          {userImg ? (
            <Image
              src={userImg}
              alt="user-img"
              height={30}
              width={30}
              className="rounded-full h-8 w-8"
            />
          ) : (
            <AccountCircle className="text-4xl text-gray-400" />
          )}
          <div>
            <NameForBlog name={name} month={month} day={day} year={year} />
            {isEdited && <p className="text-gray-400 text-sm">(Edited)</p>}
            <p className="mt-1">{content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
