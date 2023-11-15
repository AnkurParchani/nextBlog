"use client";

import { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { dislikeBlog, likeBlog } from "@/actions/blog";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

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
  const [cookie] = useCookies();
  const router = useRouter();
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
    if (!cookie.token) return router.push("/login");

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
      <span className="mr-0.5">{numLikes}</span>
      {isLiked ? (
        <FavoriteIcon onClick={handleBlogLike} style={{ fontSize: "18px" }} />
      ) : (
        <FavoriteBorderIcon
          onClick={handleBlogLike}
          style={{ fontSize: "18px" }}
        />
      )}
    </span>
  );
};

export default Likes;
