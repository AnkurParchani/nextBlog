import SubNav from "@/components/nav/SubNav";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import Container from "@/components/others/Container";
import TopLogo from "@/components/others/TopLogo";

import { getBlog } from "../../../../utils/blogs/apiBlogs";
import Likes from "@/components/others/LikeButton";

const page = async ({ params }: { params: { blogId: string } }) => {
  const blog = await getBlog(params.blogId);

  // Extracting all the details from the response
  const {
    blog: {
      comments: numComments,
      content,
      likes,
      createdAt,
      img,
      title,
      user: { email, name, _id: userId },
    },
    comments,
  } = blog;

  return (
    <div>
      <TopLogo backLinkTo="/" showUserIcon userId={userId} />
      <AddBlogIcon />
      <SubNav heading={title} />

      <Container>
        <div className="pb-12 pt-2 px-2.5 bg-slate-900 rounded-md">
          <p className="font-normal leading-relaxed tracking-wide">{content}</p>
          <div className="mt-5 flex justify-between px-1">
            <Likes likes={likes} />
            <p className="text-blue-400 font-semibold uppercase text-sm tracking-wider">
              - {name}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
