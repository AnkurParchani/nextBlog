import SubNav from "@/components/nav/SubNav";
import AddBlogIcon from "@/components/others/AddBlogIcon";
import Container from "@/components/others/Container";
import TopLogo from "@/components/others/TopLogo";
import { getBlog } from "../../../../utils/blogs/apiBlogs";

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
      user: { email, name },
    },
    comments,
  } = blog;

  return (
    <div>
      <TopLogo backLinkTo="/" showUserIcon />
      <AddBlogIcon />
      <SubNav heading={title} />

      <Container>
        <div className="pb-12">
          <p className="font-normal leading-relaxed tracking-wide">{content}</p>
          <p className="text-right mt-2 font-bold uppercase text-sm tracking-wider text-blue-400">
            - {name}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default page;
