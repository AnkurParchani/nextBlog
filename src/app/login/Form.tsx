"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/others/Input";
import Button from "@/components/others/Button";
import getErrorMessage from "../../../utils/errors/getErrorMessage";

import { login } from "@/actions/login";

const Form = () => {
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const router = useRouter();

  async function userLogin(event: FormData) {
    const data = await login(event);
    setIsLogging(false);

    // If data found OR error in data;
    if ("error" in data) return toast.error(getErrorMessage(data));
    else {
      toast.success("Logged In");
      router.back();
    }
  }

  return (
    <form
      action={userLogin}
      className="flex flex-col gap-5 mt-2"
      autoComplete="off"
    >
      <Input label="Email" inputId="email" type="email" />
      <Input label="Password" inputId="password" type="password" />
      <Button onClick={() => setIsLogging(true)}>
        {isLogging ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default Form;
