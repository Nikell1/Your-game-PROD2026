import { COLOR_PRIMARY } from "../constants";
import { cn } from "../lib";

interface FrameProps {
  color?: string;
  children: React.ReactNode;
  className?: string;
}

export function Frame({
  children,
  color = COLOR_PRIMARY,
  className,
}: FrameProps) {
  return (
    <div
      className={cn(className, "p-4 backdrop-blur-xs border flex flex-col")}
      style={{
        backgroundColor: `${color}10`,
        borderColor: color,
      }}
    >
      {children}
    </div>
  );
}
