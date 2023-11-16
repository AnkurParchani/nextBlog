"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

// Intro of the page (contains user pic, name and email)
type ProfileIntroProps = {
  userName: string;
  userEmail: string;
  userPhoto?: string;
};
const ProfileIntro = ({
  userName,
  userEmail,
  userPhoto,
}: ProfileIntroProps) => {
  const theme = useSelector(getTheme);

  return (
    <div className="flex flex-col items-center gap-1">
      {userPhoto ? (
        <Image
          src={userPhoto}
          alt="user-photo"
          height={200}
          width={200}
          className="rounded-full h-24 w-auto"
        />
      ) : (
        <AccountCircleIcon
          style={{
            fontSize: "70px",
            color: theme === "dark" ? " rgb(209 213 219)" : "rgb(75 85 99)",
          }}
        />
      )}
      <p
        className={`font-semibold capitalize ${
          theme === "dark" ? "text-blue-300" : "text-blue-600"
        } text-lg`}
      >
        {userName}
      </p>
      <p className="text-gray-500 font-medium text-xs -mt-1">({userEmail})</p>
    </div>
  );
};

export default ProfileIntro;
