import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import ProfileIntro from "@/components/others/ProfileIntro";
import TopLogo from "@/components/others/TopLogo";
import ActionBox from "./ActionBox";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DeleteIcon from "@mui/icons-material/Delete";
import LoginIcon from "@mui/icons-material/Login";

import { getLoggedInUser } from "../../../utils/users/apiUsers";

const page = async () => {
  const { name, email, _id } = await getLoggedInUser();

  return (
    <div>
      <TopLogo />
      <SubNav heading="My-Profile" />

      <Container>
        <ProfileIntro userName={name} userEmail={email} />

        <div className="flex flex-col gap-4 capitalize mt-8">
          <div className="bg-blue-800 h-0.5" />
          <ActionBox
            icon={<AccountCircleIcon className="text-3xl text-blue-500" />}
            action="edit my profile"
          />

          <div className="bg-pink-800 h-0.5" />
          <ActionBox
            icon={<BookIcon className="text-3xl text-pink-500" />}
            action="see my blogs"
            linkHref="/blogs/my-blogs"
            subNavTitle="My-Blogs"
          />
          <ActionBox
            icon={<FavoriteIcon className="text-3xl text-pink-500" />}
            action="see blogs i've liked"
            linkHref="/blogs/liked-blogs"
            subNavTitle="My Liked Blogs"
          />

          <div className="bg-green-800 h-0.5" />
          <ActionBox
            icon={<DarkModeIcon className="text-3xl text-green-500" />}
            action="change theme"
          />

          <div className="bg-red-800 h-0.5" />
          <ActionBox
            icon={<LogoutIcon className="text-3xl text-red-500" />}
            action="sign out"
          />
          <ActionBox
            icon={<LoginIcon className="text-3xl text-red-500" />}
            action="login to different account"
            linkHref="/login"
            subNavTitle="Login"
          />
          <ActionBox
            icon={<DeleteIcon className="text-3xl text-red-500" />}
            action="delete my Account"
          />
        </div>
      </Container>
    </div>
  );
};

export default page;
