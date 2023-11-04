"use client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Likes = ({ likes }: { likes: number }) => {
  function handleBlogLike() {
    console.log("LIked");
  }

  return (
    <span className="text-gray-500">
      {likes}
      <FavoriteBorderIcon className="text-base ml-0.5 cursor-pointer" />
    </span>
  );
};

export default Likes;
