"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/others/Input";
import Button from "@/components/others/Button";
import getErrorMessage from "../../../utils/errors/getErrorMessage";

import { login } from "@/actions/login";

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function userLogin(event: FormData) {
    const data = await login(event);
    setIsLoading(false);

    // If data found OR error in data;
    if (!data?.error) {
      const name = String(data.name).split(" ")[0];
      const nameToShow = name.charAt(0).toUpperCase() + name.slice(1);

      toast.success(`Welcome back, ${nameToShow}`);
      router.push("/");
    } else {
      return toast.error(getErrorMessage(data));
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
      <Button onClick={() => setIsLoading(true)}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default Form;