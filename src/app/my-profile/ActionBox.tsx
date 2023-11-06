import Link from "next/link";

function ActionBox({
  action,
  icon,
  linkHref,
}: {
  action: string;
  icon: React.ReactNode;
  linkHref?: string;
}) {
  return (
    <>
      {linkHref ? (
        <Link
          href={linkHref}
          className="bg-[#111] flex gap-3 items-center text-white rounded-md px-4 py-4"
        >
          {icon}
          <p>{action}</p>
        </Link>
      ) : (
        <div className="bg-[#111] flex gap-3 items-center text-white rounded-md px-4 py-4">
          {icon}
          <p>{action}</p>
        </div>
      )}
    </>
  );
}
export default ActionBox;
