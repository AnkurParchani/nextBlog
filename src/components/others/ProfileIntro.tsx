import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Intro of the page (contains user pic, name and email)
type ProfileIntroProps = {
  userName: string;
  userEmail: string;
};
const ProfileIntro = ({ userName, userEmail }: ProfileIntroProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <AccountCircleIcon className="text-7xl text-gray-200" />
      <p className="font-semibold text-blue-300 text-lg">{userName}</p>
      <p className="text-gray-500 font-medium text-xs -mt-1">({userEmail})</p>
    </div>
  );
};

export default ProfileIntro;
