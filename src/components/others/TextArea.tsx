"use client";
import { ChangeEventHandler } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

type TextAreaType = {
  id: string;
  cols: number;
  label?: string;
  rows: number;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  bgColor?: string;
  className?: string;
  value?: string;
};

function TextArea({
  id,
  cols,
  rows,
  label,
  required,
  defaultValue,
  placeholder,
  value,
  onChange,
  className,
  bgColor,
}: TextAreaType) {
  const theme = useSelector(getTheme);
  const requiredClass = "after:content-['*'] after:ml-0.5 after:text-red-500";
  const universalClass = `${
    bgColor ? bgColor : "bg-black"
  } border-b p-1 w-full outline-none focus:border-[#1d9bf0] duration-200`;

  return (
    <label htmlFor={id}>
      <span
        className={`px-0.5 font-semibold ${
          theme === "dark" ? "text-gray-100" : "text-gray-800"
        } tracking-wide ${required && requiredClass}`}
      >
        {label}
      </span>
      <textarea
        className={className || universalClass}
        required
        name={id}
        placeholder={placeholder}
        id={id}
        value={value}
        defaultValue={defaultValue}
        cols={cols}
        onChange={onChange}
        rows={rows}
      />
    </label>
  );
}

export default TextArea;
