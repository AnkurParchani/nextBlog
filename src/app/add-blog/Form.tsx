"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import getErrorMessage from "../../../utils/errors/getErrorMessage";

import { addBlog } from "@/actions/blog";
import { RingSpinner } from "../../../utils/others/Spinner";

type NumCharType = {
  title: string;
  content: string;
};

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numCharacters, setNumCharacters] = useState<NumCharType>({
    title: "",
    content: "",
  });

  const router = useRouter();

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

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    if (title.length > 20) return;

    setNumCharacters({ ...numCharacters, title });
  }

  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const content = e.target.value;
    if (content.length > 500) return;

    setNumCharacters({ ...numCharacters, content });
  }

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
          className={`text-blue-400 text-xs text-end -mt-1.5 ${
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
          className={`text-blue-400 text-xs text-end -mt-1.5 ${
            numCharacters.content.length ? "visible" : "invisible"
          }`}
        >
          {numCharacters.content.length}/500
        </p>

        <label htmlFor="global" className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="global"
            name="global"
            defaultChecked={true}
            className="h-4 w-4 rounded-full appearance-none checked:bg-green-600 bg-red-600"
          />
          <span className="text-blue-200">Make your Blog Global</span>
        </label>

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
