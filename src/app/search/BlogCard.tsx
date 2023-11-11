import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { setBottomNavLink } from "../../../utils/slices/UiSlice";
import { BlogWithoutLink } from "../users/blogs/BlogWithoutLink";

const FoundBlogs = ({ foundBlogs }: { foundBlogs: Blog[] }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <h1 className="font-medium my-3 text-yellow-300">Found Blogs:-</h1>

      <div className="grid grid-cols-1 gap-3">
        {foundBlogs.map((blog) => (
          <div
            key={blog._id}
            onClick={() => {
              dispatch(setBottomNavLink(""));
              router.push(`/blogs/${blog._id}`);
            }}
            className="bg-[#111] px-3 py-4 rounded-xl flex gap-2 items-start"
          >
            {!blog.img && (
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
        ))}
      </div>
    </>
  );
};

export default FoundBlogs;
