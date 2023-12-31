"use client";

import { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ModalFormTemplate from "./ModalFormTemplate";
import Input from "./Input";
import Button from "./Button";
import getErrorMessage from "../../../utils/errors/getErrorMessage";

import { addComment } from "@/actions/blog";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

const CommentButton = ({
  comments,
  blogId,
  hasCommentFunctionality,
}: {
  comments: number;
  blogId?: string;
  hasCommentFunctionality?: boolean;
}) => {
  const router = useRouter();
  const [action, setAction] = useState<string>("");
  const [cookie] = useCookies();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useSelector(getTheme);

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
      const data = await addComment(event);

      setIsLoading(false);

      if (!data?.error) {
        toast.success("Comment added successfully");
        setAction("");
      } else {
        return toast.error(getErrorMessage(data));
      }
    } catch (err) {
      setIsLoading(false);
      return toast.error(getErrorMessage(err));
    }
  }

  return (
    <div>
      <span className="text-gray-500 cursor-pointer">
        <span className="mr-0.5">{comments}</span>

        <ChatBubbleOutlineRoundedIcon
          onClick={handleCommentClick}
          style={{ fontSize: "18px" }}
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
            bgColor={theme === "dark" ? "bg-[#222]" : "bg-gray-200"}
            label="Say something about this blog..."
            inputId="content"
            type="text"
          />

          <input type="hidden" value={blogId} name="blogId" />

          <p
            className={`text-xs font-medium leading-snug ${
              theme === "dark" ? "text-green-400" : "text-green-500"
            }`}
          >
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
