// Page to show and control the see more button of a particular blog
"use client";

import { useEffect, useState } from "react";

type BlogTextType = { content: string };

const BlogText = ({ content }: BlogTextType) => {
  const [readMore, setReadMore] = useState<boolean>(true);

  useEffect(() => {
    if (content.length > 100) {
      setReadMore(false);
    }
  }, [content]);

  const contentToShow = readMore ? content : content.slice(0, 100);

  return (
    <>
      <p className="text-sm mt-1 leading-relaxed tracking-wide">
        {contentToShow}
        {!readMore && "..."}
      </p>

      {/* If read more is false, i.e show less content */}
      {!readMore && (
        <p
          onClick={(e) => {
            e.preventDefault();
            setReadMore(true);
          }}
          className="text-[#1d9bf0] hover:underline"
        >
          Read more
        </p>
      )}
    </>
  );
};

export default BlogText;
