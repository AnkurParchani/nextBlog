import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Link from "next/link";

const AddBlogIcon = () => {
  return (
    <Link
      href="/add-blog"
      className="bg-[#1d9bf0] hover:bg-[#41acf4] duration-100 rounded-full p-2.5 fixed right-4 bottom-16 text-white"
    >
      <AddRoundedIcon className="text-3xl" />
    </Link>
  );
};

export default AddBlogIcon;
