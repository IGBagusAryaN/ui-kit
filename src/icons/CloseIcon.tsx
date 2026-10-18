import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { IconProps } from "./types";

export const CloseIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  }
);

CloseIcon.displayName = "CloseIcon";
