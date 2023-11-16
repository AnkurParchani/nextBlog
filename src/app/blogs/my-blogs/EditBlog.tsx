"use client";
import toast from "react-hot-toast";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import Button from "@/components/others/Button";
import ModalFormTemplate from "@/components/others/ModalFormTemplate";
import Input from "@/components/others/Input";
import TextArea from "@/components/others/TextArea";
import getErrorMessage from "../../../../utils/errors/getErrorMessage";
import Checkbox from "@/components/others/Checkbox";

import { updateBlog, uploadBlogImg } from "@/actions/blog";
import BlogImgPicker from "@/components/others/BlogImgPicker";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getTheme } from "../../../../utils/slices/UiSlice";

type EditBlogType = {
  blog: Blog;
  setAction: Dispatch<SetStateAction<string>>;
};

// Editing the blog (doing the request)
const EditBlog = ({ blog, setAction }: EditBlogType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useSelector(getTheme);
  const {
    content,
    title,
    _id: blogId,
    isGlobal,
    img: blogImgFromDatabase,
  } = blog;
  const [blogImg, setBlogImg] = useState<string | undefined>(
    blogImgFromDatabase
  );

  async function handleUpdateBlog(event: FormData) {
    try {
      setIsLoading(true);
      await updateBlog(event, blogId, blogImg);

      setIsLoading(false);

      toast.success("Blog updated successfully");
      setAction("");
    } catch (err) {
      setIsLoading(false);
      return toast.error(getErrorMessage(err));
    }
  }

  // Uploading the img
  async function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();

    if (e.target.files) {
      formData.append("img", e.target.files[0]);
    }

    const imgPath = await uploadBlogImg(formData);
    setBlogImg(imgPath as string);
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
        {blogImg ? (
          <div className="relative">
            <Image
              src={blogImg}
              alt="blog-img"
              height={1000}
              width={1000}
              className="rounded-md w-1/2 mx-auto h-auto"
            />

            <BlogImgPicker
              handleFileInputChange={handleFileInputChange}
              insidePic
            />
          </div>
        ) : (
          <BlogImgPicker handleFileInputChange={handleFileInputChange} />
        )}

        <Input
          label="Title"
          inputId="title"
          type="text"
          defaultValue={title}
          required
          bgColor={theme === "dark" ? "bg-[#222]" : "bg-gray-200"}
        />

        <TextArea
          bgColor={theme === "dark" ? "bg-[#222]" : "bg-gray-200"}
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
