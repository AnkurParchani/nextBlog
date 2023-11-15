"use client";

import { ChangeEventHandler, useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const BlogImgPicker = ({
  handleFileInputChange,
  insidePic,
}: {
  handleFileInputChange: ChangeEventHandler<HTMLInputElement>;
  insidePic?: boolean;
}) => {
  const blogImgRef = useRef<HTMLInputElement | null>(null);

  // Handling click to add blog img
  function handleFileClick() {
    blogImgRef.current && blogImgRef.current.click();
  }

  return (
    <>
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
          className="bg-gray-800 flex justify-center py-8 rounded-md"
        >
          <AddPhotoAlternateIcon
            style={{ fontSize: "60px", color: "#9CA3AF" }}
          />
        </div>
      )}

      <input
        type="image"
        name="img"
        className="hidden"
        onChange={handleFileInputChange}
        ref={blogImgRef}
      />
    </>
  );
};

export default BlogImgPicker;
