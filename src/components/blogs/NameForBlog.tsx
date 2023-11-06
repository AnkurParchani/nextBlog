type PropType = {
  name: string;
  month: string;
  day: string;
  year?: string;
};

const NameForBlog = ({ name, month, day, year }: PropType) => {
  return (
    <div className="flex items-center gap-1">
      <p className="text-gray-100 font-medium capitalize">{name}</p>
      <p className="text-gray-500 -mt-1.5">.</p>
      <p className="text-gray-500 text-sm">
        {month} {day}
        {year && `, ${year}`}
      </p>
    </div>
  );
};

export default NameForBlog;
