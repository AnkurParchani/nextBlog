"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import getErrorMessage from "../../../utils/errors/getErrorMessage";
import Button from "@/components/others/Button";
import Input from "@/components/others/Input";
import TextArea from "@/components/others/TextArea";
import Checkbox from "@/components/others/Checkbox";

import { addBlog } from "@/actions/blog";
import { revalidateTag } from "next/cache";

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleAddBlog(event: FormData) {
    const data = await addBlog(event);
    setIsLoading(false);

    // If data found OR error in data;
    if (!data?.error) {
      const name = String(event.get("name")).split(" ")[0];
      const nameToShow = name.charAt(0).toUpperCase() + name.slice(1);

      toast.success(`Added new Blog`);
      // revalidateTag("blogs");
      router.push("/");
    } else {
      return toast.error(getErrorMessage(data));
    }
  }

  return (
    <form
      action={handleAddBlog}
      className="flex flex-col gap-5 mt-2"
      autoComplete="off"
    >
      <Input required inputId="title" type="text" label="Title" />
      <TextArea required id="content" cols={2} rows={5} label="Content" />
      <Checkbox defaultChecked id="global" label="Make your Blog Global" />

      <Button onClick={() => setIsLoading(true)}>
        {isLoading ? "Adding..." : "Add"}
      </Button>
    </form>
  );
};

export default Form;
