import { useDispatch, useSelector } from "react-redux";
import { getTheme, setBottomNavLink } from "../../../utils/slices/UiSlice";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";

const UserCard = ({ foundUsers }: { foundUsers: User[] }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useSelector(getTheme);

  return (
    <div className="max-w-4xl mx-auto ">
      <h1
        className={`font-medium my-3 ${
          theme === "dark" ? "text-yellow-300" : "text-yellow-600"
        }`}
      >
        Found Users:-
      </h1>

      {foundUsers.map((user) => (
        <div
          key={user._id}
          onClick={() => {
            dispatch(setBottomNavLink(""));
            router.push(`/users/blogs/?userId=${user._id}`);
          }}
          className={`${
            theme === "dark" ? "bg-[#111]" : "bg-gray-300"
          } cursor-pointer px-3 py-4 rounded-xl mt-3 flex gap-2 items-start`}
        >
          {user.img ? (
            <Image
              src={user.img}
              alt="user-img"
              height={300}
              width={300}
              className="rounded-full h-8 w-8"
            />
          ) : (
            <AccountCircleIcon
              style={{
                fontSize: "37px",
                color: theme === "dark" ? "#9CA3AF" : "#7e7f83",
              }}
            />
          )}

          <div className="flex-grow">
            <h1
              className={`${
                theme === "dark" ? "text-blue-300" : "text-blue-500"
              } font-medium`}
            >
              {user.name}
            </h1>
            <p
              className={`${
                theme === "dark" ? "text-gray-500" : "text-gray-600"
              } font-medium text-xs`}
            >
              ({user.email})
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
