"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import getErrorMessage from "../../../utils/errors/getErrorMessage";

import { addBlog } from "@/actions/blog";

import { RingSpinner } from "../../../utils/others/Spinner";

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  return (
    <div className="bg-gray-900 p-3 rounded-md">
      <form
        action={handleAddBlog}
        className="flex flex-col gap-4"
        autoComplete="off"
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="bg-gray-900 border-b py-1 focus:outline-none font-semibold text-white"
        />

        <textarea
          cols={5}
          rows={5}
          name="content"
          placeholder="Content"
          className="bg-gray-900 font-medium text-white focus:outline-none"
        />

        <label htmlFor="global" className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="global"
            name="global"
            defaultChecked={true}
            className="h-4 w-4 appearance-none checked:bg-green-600 bg-red-600"
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
