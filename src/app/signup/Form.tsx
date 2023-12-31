"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@/components/others/Button";
import Input from "@/components/others/Input";
import getErrorMessage from "../../../utils/errors/getErrorMessage";

import { signup } from "@/actions/signup";
import { uploadUserImg } from "@/actions/user";
import ImgPicker from "@/components/others/UserImgPicker";
import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

function Form() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userImg, setUserImg] = useState<string | undefined>(undefined);
  const theme = useSelector(getTheme);

  // Signup server action function
  async function userSignup(event: FormData) {
    const data = await signup(event, userImg);
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

  // Uploading the img
  async function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();

    if (e.target.files) {
      formData.append("img", e.target.files[0]);
    }

    const imgPath = await uploadUserImg(formData);
    setUserImg(imgPath as string);
  }

  return (
    <form
      action={userSignup}
      className="flex flex-col gap-5 mt-2"
      autoComplete="off"
    >
      <div className="flex items-end justify-center">
        {userImg ? (
          <Image
            className="rounded-full h-32 w-auto"
            width={900}
            height={900}
            src={userImg}
            alt="user-img"
          />
        ) : (
          <AccountCircleIcon style={{ fontSize: "90px", color: "#9CA3AF" }} />
        )}

        <ImgPicker handleFileInputChange={handleFileInputChange} />
      </div>

      <Input
        bgColor={theme === "dark" ? "bg-black" : "bg-gray-300"}
        label="Name"
        inputId="name"
        type="text"
      />
      <Input
        bgColor={theme === "dark" ? "bg-black" : "bg-gray-300"}
        label="Email"
        inputId="email"
        type="email"
      />
      <Input
        bgColor={theme === "dark" ? "bg-black" : "bg-gray-300"}
        label="Password"
        inputId="password"
        type="password"
      />
      <Input
        bgColor={theme === "dark" ? "bg-black" : "bg-gray-300"}
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
