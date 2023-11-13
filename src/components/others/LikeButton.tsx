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
  const [userLikedBlogsArr, setUserLikedBlogsArr] = useState<
    string[] | undefined
  >(userLikedBlogs);

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

    if (!userLikedBlogsArr?.includes(blogId)) {
      // Doing all the UI updates
      setNumLikes(numLikes + 1);
      setUserLikedBlogsArr([...(userLikedBlogs as string[]), blogId]);
      setIsLiked(true);

      // Doing the server request call
      await likeBlog(blogId);
    } else {
      // Doing all the UI updates
      setNumLikes(numLikes - 1);
      setIsLiked(false);
      setUserLikedBlogsArr(userLikedBlogs?.filter((id) => id !== blogId));

      // Doing the server request call
      await dislikeBlog(blogId);
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
