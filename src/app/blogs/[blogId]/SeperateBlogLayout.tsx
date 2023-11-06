import LikeButton from "@/components/others/LikeButton";
import formatDate from "../../../../lib/formatDate";
import NameForBlog from "@/components/blogs/NameForBlog";

import { AccountCircle } from "@mui/icons-material";
import CommentButton from "@/components/others/CommentButton";

// Blog Section
export function Blog({
  content,
  likes,
  name,
  comments,
}: {
  content: string;
  likes: number;
  comments: number;
  name: string;
}) {
  return (
    <div className="pb-12 pt-2 px-2.5 bg-slate-900 rounded-md">
      <p className="font-normal leading-relaxed tracking-wide">{content}</p>
      <div className="mt-5 flex justify-between px-1">
        <div className="flex gap-3">
          <LikeButton likes={likes} />
          <CommentButton comments={comments} />
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
    <div className="flex justify-center items-end h-20 border-l-2 border-r-2 mx-2 border-white">
      <span className="uppercase mb-3 text-white">Comments</span>
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
    user: { name, _id },
  } = comment;

  const { month, day, year } = formatDate(createdAt);

  return (
    <div className="pb-12 pt-2 px-2.5 bg-slate-900 rounded-md">
      {/* If no image of the user */}
      <div className="flex gap-2">
        <AccountCircle className="text-4xl text-gray-400" />
        <NameForBlog name={name} month={month} day={day} year={year} />
      </div>
    </div>
    // <div className="pb-12 pt-2 px-2.5 bg-slate-900 rounded-md">
    //   <p className="font-normal leading-relaxed tracking-wide">Content</p>
    //   <div className="mt-5 flex justify-between px-1">
    //     <p className="text-blue-400 font-semibold uppercase text-sm tracking-wider">
    //       - Name
    //     </p>
    //   </div>
    // </div>
  );
}
