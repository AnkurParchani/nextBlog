"use client";

import toast from "react-hot-toast";
import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";

import Button from "@/components/others/Button";
import Input from "@/components/others/Input";
import getErrorMessage from "../../../utils/errors/getErrorMessage";

import { signup } from "@/actions/signup";
import { uploadUserImg } from "@/actions/user";

function Form() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function userSignup(event: FormData) {
    const data = await signup(event);
    setIsLoading(false);

    // If data found OR error in data;
    if (!data?.error) {
      const name = String(event.get("name")).split(" ")[0];
      const nameToShow = name.charAt(0).toUpperCase() + name.slice(1);

      toast.success(`Welcome ${nameToShow}`);
      router.push("/");
    } else {
      return toast.error(getErrorMessage(data));
    }
  }

  // If someone clicks for the image upload
  function handleFileClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // When the image is uploaded
  async function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();

    if (e.target.files) {
      formData.append("img", e.target.files[0]);
    }

    const data = await uploadUserImg(formData);
  }

  return (
    <form
      action={userSignup}
      className="flex flex-col gap-5 mt-2"
      autoComplete="off"
    >
      {/* Testing */}
      <div className="flex items-end justify-center">
        <AccountCircleIcon className="text-8xl text-gray-400" />
        <AddIcon
          onClick={handleFileClick}
          className="bg-blue-500 w-7 relative right-9 bottom-1 h-auto rounded-full"
        />

        <input
          type="file"
          onChange={handleFileInputChange}
          name="img"
          className="hidden"
          ref={fileInputRef}
        />
      </div>
      {/* ///////////////// */}

      <Input label="Name" inputId="name" type="text" />
      <Input label="Email" inputId="email" type="email" />
      <Input label="Password" inputId="password" type="password" />
      <Input
        label="Password Confirm"
        inputId="passwordConfirm"
        type="password"
      />
      <Button onClick={() => setIsLoading(true)}>
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}

export default Form;
