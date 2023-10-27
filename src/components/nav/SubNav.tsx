export default function SubNav({ name }: { name: string }) {
  return (
    <div className="bg-black text-white py-1.5 text-lg font-thin tracking-wide border-t border-gray-800 text-center">
      {name}
    </div>
  );
}
