import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";

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
  return (
    <div className="flex flex-col items-center gap-1">
      {userPhoto ? (
        <Image
          src={userPhoto}
          alt="user-photo"
          height={90}
          width={90}
          className="rounded-full"
        />
      ) : (
        <AccountCircleIcon style={{ fontSize: "70px", color: "#E5E7EB" }} />
      )}
      <p className="font-semibold capitalize text-blue-300 text-lg">
        {userName}
      </p>
      <p className="text-gray-500 font-medium text-xs -mt-1">({userEmail})</p>
    </div>
  );
};

export default ProfileIntro;
