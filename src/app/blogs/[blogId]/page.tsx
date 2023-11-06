import SubNav from "@/components/nav/SubNav";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import Container from "@/components/others/Container";
import TopLogo from "@/components/others/TopLogo";

import formatDate from "../../../../lib/formatDate";

import { getBlog } from "../../../../utils/blogs/apiBlogs";
import { Blog, Comment, InterSection } from "./SeperateBlogLayout";

const page = async ({ params }: { params: { blogId: string } }) => {
  const blog = await getBlog(params.blogId);

  // Extracting all the details from the response
  const {
    blog: {
      content,
      likes: numLikes,
      createdAt: blogCreatedAt,
      img,
      title,
      user: { email, name, _id: userId },
    },
    comments,
  } = blog;

  const blogCreatedAtDate: formattedDateType = formatDate(blogCreatedAt);

  return (
    <>
      <TopLogo backLinkTo="/" showUserIcon userId={userId} />
      <AddBlogIcon />

      <SubNav heading={title} showDate={blogCreatedAtDate} />

      <Container>
        <div className="flex flex-col">
          <Blog
            content={content}
            comments={comments.length}
            likes={numLikes}
            name={name}
          />

          <InterSection />

          <div className="grid grid-cols-1">
            {comments.map((comment) => (
              // @ts-ignore
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default page;
