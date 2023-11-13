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
          className="text-4xl text-white bg-blue-500 h-10 w-auto p-1 rounded-full absolute top-0 right-0"
        />
      )}

      {!insidePic && (
        <div
          onClick={handleFileClick}
          className="bg-gray-800 flex justify-center py-8 rounded-md"
        >
          <AddPhotoAlternateIcon className="text-6xl text-gray-400" />
        </div>
      )}

      <input
        type="file"
        name="img"
        className="hidden"
        onChange={handleFileInputChange}
        ref={blogImgRef}
      />
    </>
  );
};

export default BlogImgPicker;
