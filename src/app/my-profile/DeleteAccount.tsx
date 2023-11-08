"use client";
import { SetStateAction, Dispatch } from "react";
import Button from "@/components/others/Button";
import Input from "@/components/others/Input";
import Checkbox from "@/components/others/Checkbox";
import CloseIcon from "@mui/icons-material/Close";

type DeleteAccountProps = {
  setAction: Dispatch<SetStateAction<string>>;
};

const DeleteAccount = ({ setAction }: DeleteAccountProps) => {
  function handleDeleteAccount() {
    console.log("Account deleted");
  }

  return (
    <>
      {/* For overlay */}
      <div className="fixed z-40 inset-x-0 inset-y-0 w-full bg-black opacity-80" />

      {/* The form */}
      <div className="fixed z-50 bottom-0 px-4 py-5 max-h-96 overflow-y-auto inset-x-0 rounded-t-2xl bg-[#222]">
        <div className="flex items-center font-medium mb-6 justify-between">
          <h1 className="flex-1 text-center">
            <span className="text-red-500 font-semibol">Delete</span> your
            account?
          </h1>
          <CloseIcon className="text-red-500" onClick={() => setAction("")} />
        </div>
        <form
          action={handleDeleteAccount}
          className="flex flex-col gap-5 mt-2"
          autoComplete="off"
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
          <div className="flex justify-end gap-3">
            <Button externalClass="px-4 bg-red-500 py-1 text-sm font-medium">
              Delete
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeleteAccount;
