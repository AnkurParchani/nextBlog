import { useDispatch } from "react-redux";
import { setBottomNavLink } from "../../../utils/slices/UiSlice";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";

const UserCard = ({ foundUsers }: { foundUsers: User[] }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div>
      <h1 className="font-medium my-3 text-yellow-300">Found Users:-</h1>

      {foundUsers.map((user) => (
        <div
          key={user._id}
          onClick={() => {
            dispatch(setBottomNavLink(""));
            router.push(`/users/blogs/?userId=${user._id}`);
          }}
          className="bg-[#111] px-3 py-4 rounded-xl mt-3 flex gap-2 items-start"
        >
          {user.img ? (
            <Image
              src={user.img}
              alt="user-img"
              height={30}
              width={30}
              className="rounded-full h-8 w-8"
            />
          ) : (
            <AccountCircleIcon className="text-4xl text-gray-400" />
          )}

          <div className="flex-grow">
            <h1 className="text-blue-300 font-medium">{user.name}</h1>
            <p className="text-gray-500 font-medium text-xs ">({user.email})</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
