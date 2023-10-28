"use client";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

type LikeCommentType = {
  likes: number;
  comments: number;
};

function LikeAndComment({ likes, comments }: LikeCommentType) {
  return (
    <div className="text-xs flex justify-start mt-3 gap-5 text-gray-500">
      <p className="flex items-center gap-1">
        <FavoriteBorderIcon
          onClick={() => console.log("liked")}
          className="text-base"
        />
        {likes}
      </p>
      <p className="flex items-center gap-1">
        <ChatBubbleOutlineRoundedIcon
          onClick={() => console.log("commented")}
          className="text-base"
        />
        {comments}
      </p>
    </div>
  );
}

export default LikeAndComment;
