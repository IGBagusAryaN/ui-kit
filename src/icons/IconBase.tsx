import { forwardRef } from "react";
import type { IconProps } from "./types";
import { cn } from "../utils/cn";

export interface IconBaseProps extends IconProps {
  viewBox?: string;
  children: React.ReactNode;
}

/**
 * Base SVG Wrapper untuk seluruh ikon NeedUI.
 * Ikon berbasis SVG outline 2px yang minimalis, tajam, ringan,
 * dan sepenuhnya dapat dikustomisasi warnanya melalui class Tailwind CSS (currentColor).
 */
export const IconBase = forwardRef<SVGSVGElement, IconBaseProps>(
  (
    {
      size = 24,
      strokeWidth = 2,
      className = "",
      viewBox = "0 0 24 24",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "needui-icon shrink-0 inline-block align-middle transition-colors duration-150",
          className
        )}
        {...props}
      >
        {children}
      </svg>
    );
  }
);
IconBase.displayName = "IconBase";
