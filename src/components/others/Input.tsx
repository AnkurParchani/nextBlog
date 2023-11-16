"use client";
import { ChangeEventHandler } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

type InputType = {
  label?: string;
  inputId: string;
  type: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  bgColor?: string;
  defaultValue?: string;
};

function Input({
  label,
  inputId,
  type,
  className,
  onChange,
  placeholder,
  value,
  required,
  bgColor,
  defaultValue,
}: InputType) {
  const theme = useSelector(getTheme);

  const requiredClass = "after:content-['*'] after:ml-0.5 after:text-red-500";
  const universalClass = `${
    bgColor ? bgColor : "bg-black"
  } border-b p-1 w-full outline-none focus:border-[#1d9bf0] duration-200`;

  return (
    <label htmlFor={inputId}>
      <span
        className={`px-0.5 font-semibold ${
          theme === "dark" ? "text-gray-100" : "text-gray-800"
        } tracking-wide ${required && requiredClass}`}
      >
        {label}
      </span>
      <input
        className={className || universalClass}
        type={type}
        name={inputId}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
        id={inputId}
        autoComplete="off"
      />
    </label>
  );
}

export default Input;
