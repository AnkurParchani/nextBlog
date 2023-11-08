"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import getErrorMessage from "../../../utils/errors/getErrorMessage";
import Checkbox from "@/components/others/Checkbox";

import { addBlog } from "@/actions/blog";
import { RingSpinner } from "../../../utils/others/Spinner";

type NumCharType = {
  title: string;
  content: string;
};

const Form = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numCharacters, setNumCharacters] = useState<NumCharType>({
    title: "",
    content: "",
  });

  let titleColor = "text-blue-400",
    contentColor = "text-blue-400";

  // Tracking title characters
  if (numCharacters.title.length >= 15 && numCharacters.title.length < 19) {
    titleColor = "text-yellow-400";
  } else if (numCharacters.title.length > 18) {
    titleColor = "text-red-500";
  } else {
    titleColor = "text-blue-400";
  }

  // Tracking content characters
  if (
    numCharacters.content.length >= 450 &&
    numCharacters.content.length < 490
  ) {
    contentColor = "text-yellow-400";
  } else if (numCharacters.content.length >= 490) {
    contentColor = "text-red-500";
  } else {
    contentColor = "text-blue-400";
  }

  // Main function to add Blog
  async function handleAddBlog(event: FormData) {
    const data = await addBlog(event);
    setIsLoading(false);

    // If data found OR error in data;
    if (!data?.error) {
      toast.success(`Added new Blog`);
      router.push("/");
    } else {
      return toast.error(getErrorMessage(data));
    }
  }

  // Function to track title characters
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    if (title.length > 20) return;

    setNumCharacters({ ...numCharacters, title });
  }

  // Function to track content characters
  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const content = e.target.value;
    if (content.length > 500) return;

    setNumCharacters({ ...numCharacters, content });
  }

  // The JSX
  return (
    <div className="bg-gray-900 p-3 rounded-md">
      <form
        action={handleAddBlog}
        className="flex flex-col gap-4"
        autoComplete="off"
      >
        <input
          type="text"
          value={numCharacters.title}
          placeholder="Title"
          name="title"
          onChange={handleTitleChange}
          className="bg-gray-900 border-b py-1 duration-100 focus:border-blue-400 outline-none font-semibold flex-1 text-white"
        />

        <p
          className={`${titleColor} text-xs text-end -mt-1.5 ${
            numCharacters.title.length ? "visible" : "invisible"
          }`}
        >
          {numCharacters.title.length}/20
        </p>

        <textarea
          cols={5}
          value={numCharacters.content}
          onChange={handleContentChange}
          rows={5}
          name="content"
          placeholder="Content"
          className="bg-gray-900 font-medium text-white focus:outline-none"
        />

        <p
          className={`${contentColor} text-xs text-end -mt-1.5 ${
            numCharacters.content.length ? "visible" : "invisible"
          }`}
        >
          {numCharacters.content.length}/500
        </p>

        <Checkbox defaultChecked id="global" label="Make your Blog Global" />

        <button
          className="bg-[#1d9bf0] hover:bg-[#51aeec] duration-200 self-end px-5 py-1 mt-2 rounded-md text-base outline-none"
          onClick={() => setIsLoading(true)}
        >
          {isLoading ? <RingSpinner /> : "Post"}
        </button>
      </form>
    </div>
  );
};

export default Form;
