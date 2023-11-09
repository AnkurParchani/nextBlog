import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";

import Button from "@/components/others/Button";
import ModalFormTemplate from "@/components/others/ModalFormTemplate";
import Input from "@/components/others/Input";
import TextArea from "@/components/others/TextArea";
import getErrorMessage from "../../../../utils/errors/getErrorMessage";
import Checkbox from "@/components/others/Checkbox";

import { updateBlog } from "@/actions/blog";

type EditBlogType = {
  blog: Blog;
  setAction: Dispatch<SetStateAction<string>>;
};

const EditBlog = ({ blog, setAction }: EditBlogType) => {
  console.log(blog);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { content, title, _id: blogId, isGlobal } = blog;

  async function handleUpdateBlog(event: FormData) {
    try {
      setIsLoading(true);
      await updateBlog(event, blogId);

      setIsLoading(false);

      toast.success("Blog updated successfully");
      setAction("");
    } catch (err) {
      setIsLoading(false);
      return toast.error(getErrorMessage(err));
    }
  }

  return (
    <ModalFormTemplate
      colorSubheading="Edit"
      mainHeading="Blog"
      handleFunction={handleUpdateBlog}
      setAction={setAction}
      setIsLoading={setIsLoading}
      headingColor="text-blue-500"
    >
      <div className="flex flex-col gap-5">
        <Input
          label="Title"
          inputId="title"
          type="text"
          defaultValue={title}
          required
          bgColor="bg-[#222]"
        />

        <TextArea
          bgColor="bg-[#222]"
          cols={5}
          rows={3}
          required
          label="Content"
          id="content"
          defaultValue={content}
        />

        <Checkbox
          defaultChecked={isGlobal}
          id="global"
          label="Make your Blog Global"
        />
      </div>

      <div className="self-end">
        <Button externalClass="px-4 bg-blue-500 py-1 text-sm font-medium">
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </div>
    </ModalFormTemplate>
  );
};

export default EditBlog;
