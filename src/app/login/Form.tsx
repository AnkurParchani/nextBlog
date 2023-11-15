"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/others/Input";
import Button from "@/components/others/Button";
import getErrorMessage from "../../../utils/errors/getErrorMessage";

import { login } from "@/actions/login";
import { useDispatch } from "react-redux";
import { setBottomNavUserImg } from "../../../utils/slices/UiSlice";

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  async function userLogin(event: FormData) {
    const data = await login(event);
    setIsLoading(false);

    // If data found OR error in data;
    if (!data?.error) {
      const name = String(data.user.name).split(" ")[0];
      const nameToShow = name.charAt(0).toUpperCase() + name.slice(1);

      dispatch(setBottomNavUserImg(data.user.img || undefined));
      toast.success(`Welcome back, ${nameToShow}`);
      router.push("/");
    } else {
      return toast.error(getErrorMessage(data));
    }
  }

  return (
    <form
      action={userLogin}
      className="flex flex-col gap-5 mt-2 md:mt-10"
      autoComplete="off"
    >
      <Input label="Email" inputId="email" type="email" />
      <Input label="Password" inputId="password" type="password" />
      <Button onClick={() => setIsLoading(true)}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default Form;
