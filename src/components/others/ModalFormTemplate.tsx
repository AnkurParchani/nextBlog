"use client";

import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";
import CloseIcon from "@mui/icons-material/Close";

type ModalFormTemplateType = {
  setAction: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleFunction: (event: FormData) => Promise<string | undefined>;
  children: React.ReactNode;
  colorSubheading: string;
  mainHeading: string;
  headingColor: string;
};

const ModalFormTemplate = ({
  setAction,
  children,
  setIsLoading,
  handleFunction,
  colorSubheading,
  mainHeading,
  headingColor,
}: ModalFormTemplateType) => {
  const theme = useSelector(getTheme);

  return (
    <>
      {/* For overlay */}
      <div className="fixed z-40 inset-x-0 inset-y-0 w-full bg-black opacity-80" />

      {/* The form */}
      <div
        className={`fixed z-50 bottom-0 px-4 max-h-[400px] md:max-h-full overflow-y-auto py-5 inset-x-0 rounded-t-2xl ${
          theme === "dark" ? "bg-[#222]" : "bg-gray-300"
        } max-w-3xl mx-auto`}
      >
        <div className="flex items-center font-medium mb-6 justify-between">
          <h1 className="flex-1 text-center">
            <span className={`${headingColor} font-semibold`}>
              {colorSubheading}
            </span>{" "}
            {mainHeading}
          </h1>

          <CloseIcon className="cursor-pointer" onClick={() => setAction("")} />
        </div>

        <form
          action={(e) => {
            setIsLoading(true);
            handleFunction(e);
          }}
          className="flex flex-col gap-5 mt-2"
          autoComplete="off"
        >
          {children}
        </form>
      </div>
    </>
  );
};

export default ModalFormTemplate;
