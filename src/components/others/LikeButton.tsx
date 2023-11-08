"use client";

import { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { dislikeBlog, likeBlog } from "@/actions/blog";

const Likes = ({
  likes,
  blogId,
  userLikedBlogs,
}: {
  likes: number;
  blogId?: string;
  userLikedBlogs?: string[];
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numLikes, setNumLikes] = useState<number>(likes);

  // Checking if the blogid is in user liked blogs
  useEffect(() => {
    if (userLikedBlogs?.includes(blogId as string)) {
      setIsLiked(true);
    }
  }, [userLikedBlogs, blogId]);

  // When user clicks on like to like a blog
  async function handleBlogLike(
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) {
    e.preventDefault();
    if (!blogId) return;
    // if (!blogId || isLoading) return;

    if (!userLikedBlogs?.includes(blogId)) {
      setNumLikes(numLikes + 1);
      setIsLiked(true);
      // setIsLoading(true);

      const data = await likeBlog(blogId);
      // setIsLoading(false);

      // console.log(data);
      // if (data?.error) {
      //   return toast.error(data.error);
      // }
    } else {
      setNumLikes(numLikes - 1);
      setIsLiked(false);
      // setIsLoading(true);

      const data = await dislikeBlog(blogId);
      // setIsLoading(false);

      // if (data?.error) {
      //   return toast.error(data.error);
      // }
    }
  }

  // The JSX
  return (
    <span className={`${isLiked ? "text-pink-500" : "text-gray-500"}`}>
      {numLikes}
      {isLiked ? (
        <FavoriteIcon
          onClick={handleBlogLike}
          className="text-base ml-0.5 cursor-pointer text-pink-500"
        />
      ) : (
        <FavoriteBorderIcon
          onClick={handleBlogLike}
          className="text-base ml-0.5 cursor-pointer"
        />
      )}
    </span>
  );
};

export default Likes;
