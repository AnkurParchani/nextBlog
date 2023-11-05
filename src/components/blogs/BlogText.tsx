// Page to show and control the see more button of a particular blog
"use client";

import { useEffect, useState } from "react";

type BlogTextType = { content: string };

const BlogText = ({ content }: BlogTextType) => {
  const [readMore, setReadMore] = useState<boolean>(true);
  const isBig = content.length > 100;

  useEffect(() => {
    if (isBig) {
      setReadMore(false);
    }
  }, [isBig]);

  const contentToShow = readMore ? content : content.slice(0, 100);

  return (
    <>
      <p className="text-sm mt-1 leading-relaxed tracking-wide">
        {contentToShow}
        {!readMore && isBig && "..."}
      </p>

      {/* If content is big then show "read more" or "show less" buttons */}
      {isBig && (
        <p
          onClick={(e) => {
            e.preventDefault();
            setReadMore((val) => !val);
          }}
          className="text-[#1d9bf0] text-sm hover:underline cursor-pointer w-fit"
        >
          {readMore ? "Show less" : "Read more"}
        </p>
      )}
    </>
  );
};

export default BlogText;
