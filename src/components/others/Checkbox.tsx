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
          textBlue ? "text-blue-300" : "text-gray-300"
        } ${externalLabelClass} cursor-pointer`}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
