type ButtonType = {
  children: React.ReactNode;
};

function Button({ children }: ButtonType) {
  return (
    <button className="bg-[#1d9bf0] hover:bg-[#51aeec] duration-200 mt-3 py-0.5 rounded-sm text-base">
      {children}
    </button>
  );
}

export default Button;
