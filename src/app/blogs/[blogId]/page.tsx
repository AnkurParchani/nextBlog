import SubNav from "@/components/nav/SubNav";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import Container from "@/components/others/Container";
import TopLogo from "@/components/others/TopLogo";

import formatDate from "../../../../lib/formatDate";

import { getBlog, getLikedBlogs } from "../../../../utils/blogs/apiBlogs";
import { Blog, Comment, InterSection } from "./SeperateBlogLayout";

const page = async ({ params }: { params: { blogId: string } }) => {
  const blog = await getBlog(params.blogId);
  const userLikedBlogs =
    (await getLikedBlogs()).blogs.map((blog) => blog._id) || [];

  // Extracting all the details from the response
  const {
    blog: {
      content,
      likes: numLikes,
      createdAt: blogCreatedAt,
      img,
      title,
      _id: blogId,
      user: { email, name, _id: userId },
    },
    comments,
  } = blog;

  const blogCreatedAtDate: formattedDateType = formatDate(blogCreatedAt);
  const hasComments = comments.length > 0;

  return (
    <>
      <TopLogo backLinkTo="/" showUserIcon userId={userId} />
      <AddBlogIcon />

      <SubNav heading={title} showDate={blogCreatedAtDate} />

      <Container>
        <div className="flex flex-col">
          <Blog
            userLikedBlogs={userLikedBlogs}
            content={content}
            comments={comments.length}
            likes={numLikes}
            name={name}
            blogId={blogId}
          />

          {hasComments ? (
            <>
              <InterSection />

              <div className="grid grid-cols-1">
                {comments.map((comment) => (
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
