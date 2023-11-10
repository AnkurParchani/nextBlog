"use client";

import { ChangeEvent, useState } from "react";

import Input from "@/components/others/Input";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import CloseIcon from "@mui/icons-material/Close";

import FoundBlogs from "./BlogCard";
import UserCard from "./UserCard";

type SearchInputType = {
  blogs: Blog[];
  users: User[];
};

const SearchInput = ({ blogs, users }: SearchInputType) => {
  const [input, setInput] = useState<string>("");

  // Blogs according to search query
  const foundBlogs = blogs.filter((blog) => {
    // If char length is less than 3
    if (input.length < 3) return;

    return (
      String(blog.title).toLowerCase().includes(input.toLowerCase()) ||
      String(blog.content).toLowerCase().includes(input.toLowerCase())
    );
  });

  // Users according to search query
  const foundUsers = users.filter((user) => {
    // If char length is less than 3
    if (input.length < 3) return;

    return (
      String(user.email).toLowerCase().includes(input.toLowerCase()) ||
      String(user.name).toLowerCase().includes(input.toLowerCase())
    );
  });

  const hasBlogs = foundBlogs.length > 0;
  const hasUsers = foundUsers.length > 0;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  return (
    <>
      {/* Search bar */}
      <div className="grid grid-cols-[auto_1fr_auto] bg-gray-800 border-b py-1 px-3 w-full outline-none text-sm focus:border-[#1d9bf0] duration-200 items-center rounded-lg">
        <SearchIcon />

        <Input
          type="text"
          inputId="search"
          value={input}
          onChange={handleChange}
          className="w-full font-semibold text-sm bg-gray-800  outline-none"
          placeholder="Search for any Blogs or Users"
        />

        {input.length > 0 && (
          <CloseIcon onClick={() => setInput("")} fontSize="small" />
        )}
      </div>

      {input.length < 3 && (
        <div className="flex items-center mt-14 flex-col ">
          <SearchIcon className="text-8xl text-gray-700" />
          <p className="text-gray-500">Search for It...</p>
        </div>
      )}

      {/* If users found */}
      {hasUsers && <UserCard foundUsers={foundUsers} />}

      {/* If blogs found */}
      {hasBlogs && <FoundBlogs foundBlogs={foundBlogs} />}

      {/* If none of them found */}
      {!hasBlogs && !hasUsers && input.length > 2 && (
        <EmptyResults input={input} />
      )}
    </>
  );
};

function EmptyResults({ input }: { input: string }) {
  return (
    <div className="flex flex-col items-center mt-14">
      <SearchOffIcon className="text-8xl text-gray-700" />
      <p className="text-gray-500 text-center px-2 text-sm">
        Sorry, no results were found for the search query:{" "}
        <span className="text-blue-500">
          &quot;{input}
          &quot;
        </span>
      </p>
    </div>
  );
}

export default SearchInput;
