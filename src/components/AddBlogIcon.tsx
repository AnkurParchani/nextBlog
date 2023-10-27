import AddRoundedIcon from "@mui/icons-material/AddRounded";

const AddBlogIcon = () => {
  return (
    <button className="bg-[#1d9bf0] hover:bg-[#41acf4] duration-100 rounded-full h-12 w-12 fixed right-2 bottom-16 text-white">
      <AddRoundedIcon className="text-3xl" />
    </button>
  );
};

export default AddBlogIcon;
