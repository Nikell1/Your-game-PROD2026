import { CSSProperties } from "react";
import { COLOR_PRIMARY } from "../constants";
import { cn } from "../lib";

interface FrameProps {
  color?: string;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Frame({
  children,
  color = COLOR_PRIMARY,
  className,
  style = {},
}: FrameProps) {
  return (
    <div
      className={cn(className, "p-4 backdrop-blur-xs border flex flex-col")}
      style={{
        ...style,
        backgroundColor: `${color}10`,
        borderColor: color,
      }}
    >
      {children}
    </div>
  );
}
