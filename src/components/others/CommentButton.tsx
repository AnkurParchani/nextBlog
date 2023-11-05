"use client";

import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

const CommentButton = ({ comments }: { comments: number }) => {
  function handleBlogComment() {
    console.log("Commented");
  }

  return (
    <span className="text-gray-500 ">
      {comments}

      <ChatBubbleOutlineRoundedIcon
        onClick={handleBlogComment}
        className="text-base ml-0.5 cursor-pointer"
      />
    </span>
  );
};

export default CommentButton;
