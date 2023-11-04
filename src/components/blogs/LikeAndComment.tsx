"use client";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

type LikeCommentType = {
  likes: number;
  comments: number;
};

export default function LikeAndComment({ likes, comments }: LikeCommentType) {
  function handleBlogLike(e: React.MouseEvent) {
    e.preventDefault();
    console.log("Liked");
  }
  function handleBlogComment(e: React.MouseEvent) {
    e.preventDefault();
    console.log("commented");
  }

  return (
    <div className="text-xs flex justify-start mt-3 gap-5 text-gray-500">
      <p className="flex items-center gap-1">
        <FavoriteBorderIcon onClick={handleBlogLike} className="text-base" />
        {likes}
      </p>
      <p className="flex items-center gap-1">
        <ChatBubbleOutlineRoundedIcon
          onClick={handleBlogComment}
          className="text-base"
        />
        {comments}
      </p>
    </div>
  );
}
