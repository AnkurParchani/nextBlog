type InputType = {
  label: string;
  inputId: string;
  type: string;
};

function Input({ label, inputId, type }: InputType) {
  return (
    <label htmlFor={inputId}>
      <span className="px-0.5 font-semibold text-gray-100 tracking-wide">
        {label}
      </span>
      <input
        className="bg-black border-b p-1 w-full outline-none focus:border-[#1d9bf0] duration-200"
        type={type}
        name={inputId}
        required
        id={inputId}
      />
    </label>
  );
}

export default Input;
