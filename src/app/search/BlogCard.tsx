import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { setBottomNavLink } from "../../../utils/slices/UiSlice";
import { BlogWithoutLink } from "../users/blogs/BlogWithoutLink";
import Image from "next/image";

const FoundBlogs = ({ foundBlogs }: { foundBlogs: Blog[] }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-medium my-3 text-yellow-300">Found Blogs:-</h1>

      <div className="grid cursor-pointer max-w-5xl lg:grid-cols-3 mx-auto grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 auto-rows-auto items-start content-start">
        {foundBlogs.map((blog) => {
          const { img: userImg } = blog.user;

          return (
            <div
              key={blog._id}
              onClick={() => {
                dispatch(setBottomNavLink(""));
                router.push(`/blogs/${blog._id}`);
              }}
              className="bg-[#111] px-3 py-4 rounded-xl flex gap-2 items-start"
            >
              {userImg ? (
                <Image
                  src={userImg}
                  alt="user-img"
                  width={300}
                  height={300}
                  className="rounded-full h-8 w-8"
                />
              ) : (
                <AccountCircleIcon className="text-4xl text-gray-400" />
              )}

              <div className="flex-grow">
                <BlogWithoutLink
                  hideLikeCommentSection
                  userId={blog.user._id}
                  blog={blog}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoundBlogs;
