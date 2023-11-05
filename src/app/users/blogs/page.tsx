import Link from "next/link";
import TopLogo from "@/components/others/TopLogo";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import formatDate from "../../../../lib/formatDate";
import BlogText from "@/components/blogs/BlogText";
import LikeButton from "@/components/others/LikeButton";
import CommentButton from "@/components/others/CommentButton";

import { getBlogsOfSingleUser } from "../../../../utils/blogs/apiBlogs";

const page = async ({
  searchParams: { userId },
}: {
  searchParams: { userId: string };
}) => {
  const blogs = await getBlogsOfSingleUser(userId);
  const { name: userName, email: userEmail } = blogs[0].user;

  // Render blogs of particular user
  return (
    <div>
      <TopLogo backLinkTo="/" />
      <AddBlogIcon />
      <SubNav heading="Blogs" />

      <Container>
        <Intro userName={userName} userEmail={userEmail} />

        <div className="grid grid-cols-1 gap-3 mt-5">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-[#111] px-3 py-4 rounded-xl flex gap-2 items-start"
            >
              {!blog.img && (
                <AccountCircleIcon className="text-4xl text-gray-400" />
              )}

              <BlogWithoutLink blog={blog} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

// Template for the Blog (container which will render whole info about a particular blog)
export function BlogWithoutLink({ blog }: { blog: Blog }) {
  const { title, likes, content, createdAt, comments, _id: blogId } = blog;
  const { day, month }: formattedDateType = formatDate(createdAt);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 font-medium capitalize">
        <p className="text-blue-300">{title}</p>
        <p className="text-gray-500 -mt-1.5">.</p>
        <p className="text-gray-500 text-sm">
          {month} {day}
        </p>
      </div>

      <BlogText content={content} />

      <div className="flex text-sm gap-4 mt-3">
        <LikeButton likes={likes} />
        <Link href={`/blogs/${blogId}`}>
          <CommentButton comments={comments} />
        </Link>
      </div>
    </div>
  );
}

// Intro of the page (contains user pic, name and email)
function Intro({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <AccountCircleIcon className="text-7xl text-gray-400" />
      <p className="font-semibold text-blue-300 text-lg">{userName}</p>
      <p className="text-gray-500 font-medium text-xs -mt-1">({userEmail})</p>
    </div>
  );
}

export default page;
