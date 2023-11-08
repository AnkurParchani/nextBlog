type InputType = {
  label: string;
  inputId: string;
  type: string;
  required?: boolean;
  bgColor?: string;
  defaultValue?: string;
};

function Input({
  label,
  inputId,
  type,
  required,
  bgColor,
  defaultValue,
}: InputType) {
  const requiredClass = "after:content-['*'] after:ml-0.5 after:text-red-500";

  return (
    <label htmlFor={inputId}>
      <span
        className={`px-0.5 font-semibold text-gray-100 tracking-wide ${
          required && requiredClass
        }`}
      >
        {label}
      </span>
      <input
        className={`${
          bgColor ? bgColor : "bg-black"
        } border-b p-1 w-full outline-none focus:border-[#1d9bf0] duration-200`}
        type={type}
        name={inputId}
        defaultValue={defaultValue}
        required
        id={inputId}
      />
    </label>
  );
}

export default Input;
