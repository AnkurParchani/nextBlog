"use client";

import { ChangeEventHandler, useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

const BlogImgPicker = ({
  handleFileInputChange,
  insidePic,
}: {
  handleFileInputChange: ChangeEventHandler<HTMLInputElement>;
  insidePic?: boolean;
}) => {
  const blogImgRef = useRef<HTMLInputElement | null>(null);
  const theme = useSelector(getTheme);

  // Handling click to add blog img
  function handleFileClick() {
    blogImgRef.current && blogImgRef.current.click();
  }

  return (
    <div className="cursor-pointer">
      {insidePic && (
        <AddPhotoAlternateIcon
          onClick={handleFileClick}
          style={{
            fontSize: "40px",
            color: "white",
            backgroundColor: "#3B82F6",
            height: "2.5rem",
            width: "auto",
            padding: "0.25rem",
            borderRadius: "9999px",
            position: "absolute",
            top: "0px",
            right: "0px",
          }}
        />
      )}

      {!insidePic && (
        <div
          onClick={handleFileClick}
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-gray-200"
          } flex justify-center py-8 rounded-md`}
        >
          <AddPhotoAlternateIcon
            style={{ fontSize: "60px", color: "#9CA3AF" }}
          />
        </div>
      )}

      <input
        type="file"
        name="img"
        className="hidden"
        onChange={handleFileInputChange}
        ref={blogImgRef}
      />
    </div>
  );
};

export default BlogImgPicker;
