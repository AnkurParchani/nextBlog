"use client";

import { Dispatch, SetStateAction } from "react";
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
  return (
    <>
      {/* For overlay */}
      <div className="fixed z-40 inset-x-0 inset-y-0 w-full bg-black opacity-80" />

      {/* The form */}
      <div className="fixed z-50 bottom-0 px-4 py-5 max-h-96 overflow-y-auto inset-x-0 rounded-t-2xl bg-[#222]">
        <div className="flex items-center font-medium mb-6 justify-between">
          <h1 className="flex-1 text-center">
            <span className={`${headingColor} font-semibol`}>
              {colorSubheading}
            </span>{" "}
            {mainHeading}
          </h1>
          <CloseIcon onClick={() => setAction("")} />
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
