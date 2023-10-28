"use client";

import SubNav from "@/components/nav/SubNav";
import Container from "@/components/others/Container";

import { login } from "@/actions/login";

const page = () => {
  return (
    <div>
      <SubNav heading="Login" />
      <Container>
        <form
          action={login}
          className="flex flex-col gap-5 mt-2"
          autoComplete="off"
        >
          <label htmlFor="email">
            <span className="px-0.5 font-semibold text-gray-100 tracking-wide">
              Email
            </span>
            <input
              className="bg-black border-b p-1 w-full outline-none focus:border-[#1d9bf0] duration-200"
              type="email"
              name="email"
              required
              id="email"
            />
          </label>

          <label htmlFor="password">
            <span className="px-0.5 font-semibold text-gray-100 tracking-wide">
              Password
            </span>
            <input
              className="bg-black border-b p-1 w-full outline-none focus:border-[#1d9bf0] duration-200"
              type="password"
              required
              name="password"
              id="password"
            />
          </label>

          <button className="bg-[#1d9bf0] hover:bg-[#51aeec] duration-200 mt-3 py-0.5 rounded-sm text-base">
            Login
          </button>
        </form>
      </Container>
    </div>
  );
};

export default page;
