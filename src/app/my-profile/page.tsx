import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";
import ProfileIntro from "@/components/others/ProfileIntro";
import TopLogo from "@/components/others/TopLogo";
import ActionBox from "./ActionBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import ThemeActionBox from "@/components/others/ThemeActionBox";
import ReturnToLogin from "@/components/others/ReturnToLogin";
import DeleteIcon from "@mui/icons-material/Delete";
import LoginIcon from "@mui/icons-material/Login";

import { getLoggedInUser } from "@/actions/user";

export const dynamic = "force-dynamic";

const page = async () => {
  const user = await getLoggedInUser();
  if (!user || !user._id) return <ReturnToLogin />;

  return (
    <div>
      <TopLogo />
      <SubNav heading="My-Profile" />

      <Container>
        <ProfileIntro
          userPhoto={user.img}
          userName={user.name}
          userEmail={user.email}
        />

        <div className="flex flex-col gap-4 capitalize mt-8">
          <div className="bg-blue-800 h-0.5" />
          <ActionBox
            user={user}
            actionType="editProfile"
            icon={
              <AccountCircleIcon
                style={{
                  fontSize: "35px",
                  lineHeight: "36px",
                  color: "#60A5FA",
                }}
              />
            }
            heading="edit my profile"
            bottomNavValue="/profile"
          />

          <div className="bg-pink-800 h-0.5" />
          <ActionBox
            icon={
              <BookIcon
                style={{
                  fontSize: "30px",
                  lineHeight: "36px",
                  color: "#EC4899",
                }}
              />
            }
            heading="see my blogs"
            linkHref="/blogs/my-blogs"
            subNavTitle="My-Blogs"
            bottomNavValue=""
          />
          <ActionBox
            icon={
              <FavoriteIcon
                style={{
                  fontSize: "30px",
                  lineHeight: "36px",
                  color: "#EC4899",
                }}
              />
            }
            heading="see blogs i've liked"
            linkHref="/blogs/liked-blogs"
            subNavTitle="My Liked Blogs"
            bottomNavValue="/fav"
          />

          <ThemeActionBox />

          <div className="bg-red-800 h-0.5" />
          <ActionBox
            actionType="signout"
            icon={
              <LogoutIcon
                style={{
                  fontSize: "30px",
                  lineHeight: "36px",
                  color: "#EF4444",
                }}
              />
            }
            heading="sign out"
            bottomNavValue="/"
          />
          <ActionBox
            icon={
              <LoginIcon
                style={{
                  fontSize: "30px",
                  lineHeight: "36px",
                  color: "#EF4444",
                }}
              />
            }
            heading="login to different account"
            linkHref="/login"
            subNavTitle="Login"
            bottomNavValue=""
          />
          <ActionBox
            actionType="deleteAccount"
            icon={
              <DeleteIcon
                style={{
                  fontSize: "30px",
                  lineHeight: "36px",
                  color: "#EF4444",
                }}
              />
            }
            heading="delete my Account"
            bottomNavValue="/"
          />
        </div>
      </Container>
    </div>
  );
};

export default page;
