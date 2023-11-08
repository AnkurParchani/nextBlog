type ButtonType = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  externalClass?: string;
};

function Button({ children, onClick, externalClass }: ButtonType) {
  return (
    <button
      onClick={onClick}
      className={`${
        externalClass ? externalClass : "bg-[#1d9bf0] hover:bg-[#51aeec] py-0.5"
      } duration-200 mt-3  rounded-sm text-base`}
    >
      {children}
    </button>
  );
}

export default Button;
