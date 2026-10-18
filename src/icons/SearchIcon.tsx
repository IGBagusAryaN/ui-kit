import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { IconProps } from "./types";

export const SearchIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("shrink-0", className)}
        {...props}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    );
  }
);

SearchIcon.displayName = "SearchIcon";
