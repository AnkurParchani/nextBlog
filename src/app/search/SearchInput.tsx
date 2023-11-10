"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Input from "@/components/others/Input";
import SearchIcon from "@mui/icons-material/Search";

import FoundBlogs from "./BlogCard";
import UserCard from "./UserCard";

type SearchInputType = {
  blogs: Blog[];
  users: User[];
};

const SearchInput = ({ blogs, users }: SearchInputType) => {
  const router = useRouter();
  const dispatch = useDispatch();
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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  const hasBlogs = foundBlogs.length > 0;
  const hasUsers = foundUsers.length > 0;

  return (
    <>
      {/* Search bar */}
      <div className="grid grid-cols-[auto_1fr] bg-gray-800 border-b py-1 px-3 w-full outline-none text-sm focus:border-[#1d9bf0] duration-200 items-center rounded-lg">
        <SearchIcon />
        <Input
          type="text"
          inputId="search"
          value={input}
          onChange={handleChange}
          className="w-full font-semibold bg-gray-800 tracking-wide outline-none"
          placeholder="Search for any Blogs or Users"
        />
      </div>

      {/* If blogs found */}
      {hasBlogs && <FoundBlogs foundBlogs={foundBlogs} />}

      {/* If users found */}
      {hasUsers && <UserCard foundUsers={foundUsers} />}

      {/* If none of them found */}
      {!hasBlogs && !hasUsers && input.length > 2 && (
        <div>
          <p>Nothing found</p>
        </div>
      )}
    </>
  );
};

export default SearchInput;
