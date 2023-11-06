import Link from "next/link";

const EmptyBlogList = ({
  content,
  icon,
  linkContent,
  linkTo,
}: {
  content: string;
  icon: React.ReactNode;
  linkContent?: string;
  linkTo?: string;
}) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      {icon}
      <p className="font-semibold text-lg text-center text-gray-500">
        {content}
      </p>
      {linkTo && (
        <Link
          className="mt-3 bg-[#111] text-blue-400 py-2 px-6 font-medium rounded-md"
          href={linkTo}
        >
          {linkContent}
        </Link>
      )}
    </div>
  );
};

export default EmptyBlogList;
