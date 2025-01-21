import { cn } from "@/app/lib/utils";
import React from "react";

export const Box = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className="mx-auto min-w-[300px] px-2 py-10 sm:max-w-[500px]">
    <div
      className={cn(
        "bg-white border-black/50 flex flex-col items-center justify-center gap-4 border p-6 sm:p-[50px] rounded-md",
        className
      )}
    >
      {children}
    </div>
  </div>
);
