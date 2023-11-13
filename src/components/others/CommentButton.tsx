"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ModalFormTemplate from "./ModalFormTemplate";
import Input from "./Input";
import Button from "./Button";

import { addComment } from "@/actions/blog";
import getErrorMessage from "../../../utils/errors/getErrorMessage";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const CommentButton = ({
  comments,
  blogId,
  hasCommentFunctionality,
}: {
  comments: number;
  blogId?: string;
  hasCommentFunctionality?: boolean;
}) => {
  const [action, setAction] = useState<string>("");
  const router = useRouter();
  const [cookie] = useCookies();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleCommentClick() {
    if (!hasCommentFunctionality) return;
    if (!cookie.token) return router.push("/login");

    setAction("comment");
  }

  async function handleAddComment(
    event: FormData
  ): Promise<string | undefined> {
    try {
      setIsLoading(true);
      await addComment(event);
      setIsLoading(false);

      toast.success("Comment added successfully");
      setAction("");
    } catch (err) {
      setIsLoading(false);
      return toast.error(getErrorMessage(err));
    }
  }

  return (
    <div>
      <span className="text-gray-500 ">
        {comments}

        <ChatBubbleOutlineRoundedIcon
          onClick={handleCommentClick}
          className="text-base ml-0.5 cursor-pointer"
        />
      </span>

      {action === "comment" && (
        <ModalFormTemplate
          colorSubheading="Add"
          mainHeading="a Comment"
          handleFunction={handleAddComment}
          setAction={setAction}
          setIsLoading={setIsLoading}
          headingColor="text-green-500"
        >
          <Input
            bgColor="bg-[#222]"
            label="Say something about this blog..."
            inputId="content"
            type="text"
          />

          <input type="hidden" value={blogId} name="blogId" />

          <p className="text-xs font-medium leading-snug text-green-400">
            Note:- You won&apos;t be able to delete your comment after posting
            it. So be respectful to the community!
          </p>

          <div className="self-end">
            <Button externalClass="px-4 bg-green-600 py-1 text-sm font-medium">
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </div>
        </ModalFormTemplate>
      )}
    </div>
  );
};

export default CommentButton;
