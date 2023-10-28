"use client";

import Input from "@/components/others/Input";
import Button from "@/components/others/Button";

import { login } from "@/actions/login";
import toast from "react-hot-toast";

const Form = () => {
  async function clientLogin(event: FormData) {
    const data = await login(event);

    // change this using that video
    if (data && typeof data === "object" && "error" in data) {
      const errorData = data as { error: string };
      toast.error(errorData.error);
    } else {
      toast.success("Logged in");
    }
  }

  return (
    <form
      action={clientLogin}
      className="flex flex-col gap-5 mt-2"
      autoComplete="off"
    >
      <Input label="Email" inputId="email" type="email" />
      <Input label="Password" inputId="password" type="password" />
      <Button>Login</Button>
    </form>
  );
};

export default Form;
