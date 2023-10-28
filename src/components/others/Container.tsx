import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

function Container({ children }: ContainerProps) {
  return <div className="px-3 pt-5 pb-16 mt-20">{children}</div>;
}

export default Container;
