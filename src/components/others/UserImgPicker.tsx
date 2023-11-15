"use client";

import { ChangeEventHandler, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

const UserImgPicker = ({
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
        style={{
          width: "1.5rem",
          cursor: "pointer",
          padding: "0.25rem",
          position: "relative",
          bottom: "0.25rem",
          height: "1.5rem",
          borderRadius: "9999px",
          right: "2rem",
          backgroundColor: "#3B82F6",
        }}
      />
    </>
  );
};

export default UserImgPicker;
