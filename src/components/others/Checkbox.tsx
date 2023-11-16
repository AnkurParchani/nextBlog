import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

type CheckboxType = {
  id: string;
  label: string;
  defaultChecked?: boolean;
  textBlue?: boolean;
  externalLabelClass?: string;
  externalInputClass?: string;
};

const Checkbox = ({
  id,
  label,
  defaultChecked,
  textBlue,
  externalLabelClass,
  externalInputClass,
}: CheckboxType) => {
  const theme = useSelector(getTheme);

  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-800";

  return (
    <label htmlFor={id} className="flex gap-2 items-center">
      <input
        type="checkbox"
        id={id}
        name={id}
        defaultChecked={defaultChecked}
        className={`h-4 w-4 cursor-pointer rounded-full appearance-none checked:bg-green-600 bg-red-600 ${externalInputClass}`}
      />
      <span
        className={`${
          textBlue ? "text-blue-300" : textColor
        } ${externalLabelClass} cursor-pointer`}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
