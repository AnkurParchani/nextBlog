import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";

import Button from "@/components/others/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Input from "@/components/others/Input";
import ModalFormTemplate from "@/components/others/ModalFormTemplate";
import getErrorMessage from "../../../utils/errors/getErrorMessage";

import { editProfile } from "@/actions/user";

type EditProfileType = {
  setAction: Dispatch<SetStateAction<string>>;
  user: User;
};

const EditProfile = ({ setAction, user }: EditProfileType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleEditProfile(
    event: FormData
  ): Promise<string | undefined> {
    const data = await editProfile(event);
    setIsLoading(false);

    if (data?.error) {
      return toast.error(getErrorMessage(data));
    }

    toast.success("Profile updated successfully");
    setAction("");
  }

  return (
    <ModalFormTemplate
      colorSubheading="Update"
      mainHeading="your Profile"
      handleFunction={handleEditProfile}
      setAction={setAction}
      setIsLoading={setIsLoading}
      headingColor="text-blue-500"
    >
      {/* Change it for the img */}
      <div className="text-center">
        <AccountCircleIcon className="text-8xl text-gray-300" />
      </div>

      <Input
        defaultValue={user.name}
        bgColor="bg-[#222]"
        label="Name"
        inputId="name"
        type="text"
      />
      <Input
        defaultValue={user.email}
        bgColor="bg-[#222]"
        label="Email"
        inputId="email"
        type="email"
      />

      <div className="self-end">
        <Button externalClass="px-4 bg-blue-500 py-1 text-sm font-medium">
          {isLoading ? "updating..." : "Update"}
        </Button>
      </div>
    </ModalFormTemplate>
  );
};

export default EditProfile;
