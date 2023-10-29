"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/others/Button";
import Input from "@/components/others/Input";
import getErrorMessage from "../../../utils/errors/getErrorMessage";

import { signup } from "@/actions/signup";

function Form() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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

  return (
    <form
      action={userSignup}
      className="flex flex-col gap-5 mt-2"
      autoComplete="off"
    >
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
