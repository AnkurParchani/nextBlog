import SubNav from "@/components/nav/SubNav";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import Container from "@/components/others/Container";
import TopLogo from "@/components/others/TopLogo";
import formatDate from "../../../../lib/formatDate";

import {
  getBlog,
  getBlogs,
  getLikedBlogs,
} from "../../../../utils/blogs/apiBlogs";
import { Blog, Comment, InterSection } from "./SeperateBlogLayout";

const page = async ({ params }: { params: { blogId: string } }) => {
  const blog = await getBlog(params.blogId);

  // Fetching and setting all liked blogs of user
  const fetchUserLikedBlogs = (await getLikedBlogs()).blogs;
  let userLikedBlogs: string[];
  if (!fetchUserLikedBlogs || fetchUserLikedBlogs[0] === null) {
    userLikedBlogs = [];
  } else {
    userLikedBlogs = fetchUserLikedBlogs.map((blog: Blog) => blog._id);
  }

  // Extracting all the details from the response
  const {
    blog: {
      content,
      likes: numLikes,
      createdAt: blogCreatedAt,
      img: blogImg,
      title,
      _id: blogId,
      user: { name, _id: userId, img: userImg },
    },
    comments,
  } = blog;

  const blogCreatedAtDate: formattedDateType = formatDate(blogCreatedAt);
  const hasComments = comments.length > 0;

  return (
    <>
      <TopLogo showBackButton showUserIcon userImg={userImg} userId={userId} />
      <AddBlogIcon />

      <SubNav heading={title} showDate={blogCreatedAtDate} />

      <Container>
        <div className="flex flex-col">
          <Blog
            hasCommentFunctionality
            userLikedBlogs={userLikedBlogs}
            content={content}
            comments={comments.length}
            img={blogImg}
            likes={numLikes}
            name={name}
            blogId={blogId}
          />

          {hasComments ? (
            <>
              <InterSection />

              <div className="grid grid-cols-1">
                {comments.map((comment: Comment) => (
                  // @ts-ignore
                  <Comment key={comment._id} comment={comment} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center mt-1 border-b py-1 border-blue-400">
              No Comments yet
            </p>
          )}
        </div>
      </Container>
    </>
  );
};

export default page;
