import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { IconProps } from "./types";

export const MenuIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    );
  }
);

MenuIcon.displayName = "MenuIcon";
