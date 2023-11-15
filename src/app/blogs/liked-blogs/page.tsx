import AddBlogIcon from "@/components/others/AddBlogIcon";

import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import TopLogo from "@/components/others/TopLogo";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmptyBlogList from "@/components/blogs/EmptyBlogList";
import Blog from "@/components/blogs/Blog";
import ReturnToLogin from "@/components/others/ReturnToLogin";

import { getLikedBlogs } from "../../../../utils/blogs/apiBlogs";
import { getUser } from "../../../../utils/users/apiUsers";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getLikedBlogs();
  if (data.tokenError) return <ReturnToLogin />;

  const user: User = await getUser();
  if (!user || !user._id) return <ReturnToLogin />;

  // Getting all the liked blogs of the user
  let userLikedBlogs: string[];
  const fetchUserLikedBlogs = (await getLikedBlogs()).blogs;
  if (fetchUserLikedBlogs && fetchUserLikedBlogs[0] !== null) {
    userLikedBlogs = fetchUserLikedBlogs.map((blog: Blog) => blog._id);
  } else {
    userLikedBlogs = [];
  }

  const blogsToShow = data?.blogs?.filter((blog: Blog) => blog.isGlobal);

  return (
    <div>
      <TopLogo />
      <SubNav heading="My Liked Blogs" />
      <AddBlogIcon />

      <Container>
        {blogsToShow && blogsToShow.length > 0 ? (
          <div className="grid max-w-5xl lg:grid-cols-3 mx-auto grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 auto-rows-auto items-start content-start">
            {blogsToShow.map((blog: Blog) => (
              <Blog
                key={blog._id}
                userId={user._id}
                blog={blog}
                userLikedBlogs={userLikedBlogs}
              />
            ))}
          </div>
        ) : (
          <EmptyBlogList
            linkContent="Explore"
            linkTo="/"
            content="Blogs you've Liked will stay here.."
            icon={
              <FavoriteIcon style={{ fontSize: "96px", color: "#60A5FA" }} />
            }
          />
        )}
      </Container>
    </div>
  );
};

export default page;
