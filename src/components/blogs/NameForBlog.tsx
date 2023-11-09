import EditMenuButton from "../others/EditMenuButton";

type PropType = {
  name: string;
  month: string;
  day: string;
  year?: string;
  blueTitle?: boolean;
  editMenuButton?: boolean;
};

const NameForBlog = ({
  name,
  month,
  day,
  year,
  blueTitle,
  editMenuButton,
}: PropType) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1">
        <p
          className={`${
            blueTitle ? "text-blue-300" : "text-gray-100"
          } font-medium capitalize`}
        >
          {name}
        </p>
        <p className="text-gray-500 -mt-1.5">.</p>
        <p className="text-gray-500 text-sm">
          {month} {day}
          {year && `, ${year}`}
        </p>
      </div>
      {editMenuButton && <EditMenuButton />}
    </div>
  );
};

export default NameForBlog;
