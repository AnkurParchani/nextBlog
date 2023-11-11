"use client";

import { ChangeEventHandler, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

const ImgPicker = ({
  handleFileInputChange,
}: {
  handleFileInputChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <>
      <input
        type="file"
        onChange={handleFileInputChange}
        name="img"
        className="hidden"
        ref={fileInputRef}
      />

      <AddIcon
        onClick={handleFileClick}
        className="bg-blue-500 w-7 cursor-pointer relative right-9 bottom-1 h-auto rounded-full"
      />
    </>
  );
};

export default ImgPicker;
