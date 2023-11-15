import SubNav from "@/components/nav/SubNav";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import Container from "@/components/others/Container";
import TopLogo from "@/components/others/TopLogo";
import BookIcon from "@mui/icons-material/Book";
import EmptyBlogList from "@/components/blogs/EmptyBlogList";
import ReturnToLogin from "@/components/others/ReturnToLogin";
import Blog from "./Blog";

import { getLikedBlogs, getMyBlogs } from "../../../../utils/blogs/apiBlogs";
import { getUser } from "../../../../utils/users/apiUsers";

export const dynamic = "force-dynamic";

const page = async () => {
  const blogs = await getMyBlogs();
  if (blogs.tokenError) return <ReturnToLogin />;

  const user: User = await getUser();
  if (!user) return <ReturnToLogin />;

  const hasBlogs = blogs.length > 0;

  // Fetching and setting all liked blogs of user
  const fetchUserLikedBlogs = (await getLikedBlogs()).blogs;
  let userLikedBlogs: string[];
  if (!fetchUserLikedBlogs || fetchUserLikedBlogs[0] === null) {
    userLikedBlogs = [];
  } else {
    userLikedBlogs = fetchUserLikedBlogs.map((blog: Blog) => blog._id);
  }

  return (
    <div>
      <TopLogo showBackButton />
      <AddBlogIcon />
      <SubNav heading="My-Blogs" />

      <Container>
        {hasBlogs ? (
          <div className="grid grid-cols-1 gap-3">
            {blogs.map((blog: Blog) => (
              <Blog
                key={blog._id}
                blog={blog}
                user={user}
                userLikedBlogs={userLikedBlogs}
              />
            ))}
          </div>
        ) : (
          <EmptyBlogList
            content="Your posted Blogs will stay here"
            linkTo="/add-blog"
            linkContent="Post a Blog"
            icon={<BookIcon style={{ fontSize: "120px", color: "#60A5FA" }} />}
          />
        )}
      </Container>
    </div>
  );
};

export default page;
