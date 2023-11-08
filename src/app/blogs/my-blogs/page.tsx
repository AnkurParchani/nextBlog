import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SubNav from "@/components/nav/SubNav";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import Container from "@/components/others/Container";
import TopLogo from "@/components/others/TopLogo";
import BookIcon from "@mui/icons-material/Book";
import EmptyBlogList from "@/components/blogs/EmptyBlogList";

import { getLikedBlogs, getMyBlogs } from "../../../../utils/blogs/apiBlogs";
import { BlogWithoutLink } from "@/app/users/blogs/BlogWithoutLink";

const page = async () => {
  const blogs = await getMyBlogs();
  const fetchLikedBlogs = await getLikedBlogs();
  const userLikedBlogs = fetchLikedBlogs.blogs.map((blog) => blog._id) || [];
  const hasBlogs = blogs.length > 0;

  return (
    <div>
      <TopLogo backLinkTo="/" />
      <AddBlogIcon />
      <SubNav heading="My-Blogs" />

      <Container>
        {hasBlogs ? (
          <div className="grid grid-cols-1 gap-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-[#111] px-3 py-4 rounded-xl flex gap-2 items-start"
              >
                {!blog.img && (
                  <AccountCircleIcon className="text-4xl text-gray-400" />
                )}

                <BlogWithoutLink userLikedBlogs={userLikedBlogs} blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyBlogList
            content="Your posted Blogs will stay here"
            linkTo="/add-blog"
            linkContent="Post a Blog"
            icon={<BookIcon className="text-9xl text-blue-400" />}
          />
        )}
      </Container>
    </div>
  );
};

export default page;
