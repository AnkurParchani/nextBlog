export default function SubNav({ name }: { name: string }) {
  return (
    <div className="bg-black fixed top-11 inset-x-0 text-white py-1.5 pb-2.5 text-lg font-light tracking-wide border-t border-gray-800 px-4">
      <div className="border-b-2 border-[#1d9bf0] inline-block">{name}</div>
    </div>
  );
}
