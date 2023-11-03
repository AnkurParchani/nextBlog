type TextAreaType = {
  id: string;
  cols: number;
  label: string;
  rows: number;
  required?: boolean;
};

function TextArea({ id, cols, rows, label, required }: TextAreaType) {
  const requiredClass = "after:content-['*'] after:ml-0.5 after:text-red-500";

  return (
    <label htmlFor={id}>
      <span
        className={`px-0.5 font-semibold text-gray-100 tracking-wide ${
          required && requiredClass
        }`}
      >
        {label}
      </span>
      <textarea
        className="bg-black border-b p-1 w-full outline-none focus:border-[#1d9bf0] duration-200"
        required
        name={id}
        id={id}
        cols={cols}
        rows={rows}
      />
    </label>
  );
}

export default TextArea;
