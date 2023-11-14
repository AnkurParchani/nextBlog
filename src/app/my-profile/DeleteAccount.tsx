"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SetStateAction, Dispatch, useState } from "react";

import Button from "@/components/others/Button";
import Input from "@/components/others/Input";
import Checkbox from "@/components/others/Checkbox";
import getErrorMessage from "../../../utils/errors/getErrorMessage";

import { deleteAccount } from "@/actions/user";
import ModalFormTemplate from "@/components/others/ModalFormTemplate";

type DeleteAccountProps = {
  setAction: Dispatch<SetStateAction<string>>;
};

const DeleteAccount = ({ setAction }: DeleteAccountProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleDeleteAccount(
    event: FormData
  ): Promise<string | undefined> {
    const data = await deleteAccount(event);
    setIsLoading(false);

    if (data?.error) {
      return toast.error(getErrorMessage(data));
    }

    router.push("/");
    toast.success("Account deleted successfully");
    setAction("");
  }

  return (
    <ModalFormTemplate
      colorSubheading="Delete"
      mainHeading="your Account"
      handleFunction={handleDeleteAccount}
      setAction={setAction}
      setIsLoading={setIsLoading}
      headingColor="text-red-500"
    >
      <Checkbox
        externalLabelClass="text-sm leading-relaxed tracking-wide"
        externalInputClass="w-52 self-start"
        id="disclaimer"
        label="I hereby acknowledge and accept that, upon the permanent deletion of my account, all of my blogs, comments, and likes within the application will be irreversibly and permanently removed. It is crucial to understand that this data cannot be recovered once deleted. Additionally, I am fully aware that the company bears no responsibility for any consequences or actions resulting from this account deletion. Please take this decision seriously, as it will lead to the complete erasure of your data within the platform."
        defaultChecked={false}
      />
      <Input
        bgColor="bg-[#222]"
        label="Enter your password"
        required
        inputId="password"
        type="password"
      />

      <div className="self-end">
        <Button externalClass="px-4 bg-red-500 py-1 text-sm font-medium">
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </ModalFormTemplate>
  );
};

export default DeleteAccount;
