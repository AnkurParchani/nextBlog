import { Dispatch, SetStateAction, useState } from "react";
import Button from "@/components/others/Button";
import ModalFormTemplate from "@/components/others/ModalFormTemplate";
import formatDate from "../../../../lib/formatDate";
import toast from "react-hot-toast";
import getErrorMessage from "../../../../utils/errors/getErrorMessage";
import { deleteBlog } from "@/actions/blog";

type DeleteBlogType = {
  setAction: Dispatch<SetStateAction<string>>;
  blog: Blog;
};

const DeleteBlog = ({ setAction, blog }: DeleteBlogType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { content, createdAt, title, _id: blogId } = blog;
  const { day, month } = formatDate(createdAt);
  const contentToShow =
    content.length > 100 ? `${content.slice(0, 100)}...` : content;

  async function handleDeleteBlog(): Promise<string | undefined> {
    setIsLoading(true);
    const data = await deleteBlog(blogId);
    setIsLoading(false);

    if (data?.error) {
      return toast.error(getErrorMessage(data));
    }

    toast.success("Blog deleted successfully");
    setAction("");
  }

  return (
    <ModalFormTemplate
      colorSubheading="Delete"
      mainHeading="this blog?"
      handleFunction={handleDeleteBlog}
      setAction={setAction}
      setIsLoading={setIsLoading}
      headingColor="text-red-500"
    >
      <div className="px-4 flex flex-col gap-3 bg-[#333] rounded-md py-3 ">
        <div className="flex gap-3 justify-between">
          <h1 className="capitalize font-medium text-red-300">{title}</h1>
          <p className="text-xs font-semibold">
            {month} {day}{" "}
          </p>
        </div>
        <h1 className="leading-normal text-sm tracking-wide">
          {contentToShow}
        </h1>
      </div>

      <div className="self-end">
        <Button externalClass="px-4 bg-red-500 py-1 text-sm font-medium">
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </ModalFormTemplate>
  );
};

export default DeleteBlog;
