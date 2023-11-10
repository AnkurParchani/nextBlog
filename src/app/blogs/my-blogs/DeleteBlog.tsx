import { Dispatch, SetStateAction, useState } from "react";

import Button from "@/components/others/Button";
import ModalFormTemplate from "@/components/others/ModalFormTemplate";
import formatDate from "../../../../lib/formatDate";
import toast from "react-hot-toast";
import getErrorMessage from "../../../../utils/errors/getErrorMessage";

import { deleteBlog } from "@/actions/blog";
import ModalInfoCard from "@/components/others/ModalInfoCard";

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
      <ModalInfoCard
        day={day}
        month={month}
        contentToShow={contentToShow}
        title={title}
      />

      <div className="self-end">
        <Button externalClass="px-4 bg-red-500 py-1 text-sm font-medium">
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </ModalFormTemplate>
  );
};

export default DeleteBlog;
