type ButtonType = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

function Button({ children, onClick }: ButtonType) {
  return (
    <button
      onClick={onClick}
      className="bg-[#1d9bf0] hover:bg-[#51aeec] duration-200 mt-3 py-0.5 rounded-sm text-base"
    >
      {children}
    </button>
  );
}

export default Button;
