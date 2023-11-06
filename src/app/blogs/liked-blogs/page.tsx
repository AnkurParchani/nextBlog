import AddBlogIcon from "@/components/others/AddBlogIcon";

import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import TopLogo from "@/components/others/TopLogo";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmptyBlogList from "@/components/blogs/EmptyBlogList";
import Blog from "@/components/blogs/Blog";

import { getLikedBlogs } from "../../../../utils/blogs/apiBlogs";

const page = async () => {
  const { blogs, user } = await getLikedBlogs();
  const hasBlogs = blogs.length > 0;

  return (
    <div>
      <TopLogo />
      <SubNav heading="My Liked Blogs" />
      <AddBlogIcon />

      <Container>
        {hasBlogs ? (
          <div className="grid grid-cols-1 gap-3">
            {blogs.map((blog: Blog) => (
              <Blog key={blog._id} blog={blog} userName={user.name} />
            ))}
          </div>
        ) : (
          <EmptyBlogList
            linkContent="Explore"
            linkTo="/"
            content="Blogs you've Liked will stay here.."
            icon={<FavoriteIcon className="text-9xl text-blue-400" />}
          />
        )}
      </Container>
    </div>
  );
};

export default page;
