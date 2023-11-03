type CheckboxType = {
  id: string;
  label: string;
  defaultChecked?: boolean;
};

const Checkbox = ({ id, label, defaultChecked }: CheckboxType) => {
  return (
    <label htmlFor={id} className="flex items-center">
      <input
        type="checkbox"
        id={id}
        defaultChecked={defaultChecked}
        className="mr-2 h-4 w-4"
        name={id}
      />
      <span className="px-0.5 font-semibold text-gray-100 tracking-wide">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
