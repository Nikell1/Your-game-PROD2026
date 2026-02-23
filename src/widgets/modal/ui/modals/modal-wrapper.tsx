import { cn } from "@/shared/lib";
import { Button, Frame } from "@/shared/ui";
import { X } from "lucide-react";

interface Props {
  children: React.ReactNode;
  className?: string;
  canClose?: boolean;
  close?: () => void;
  isOpen: boolean;
}

export function ModalWrapper({
  children,
  isOpen,
  className,
  canClose = false,
  close = () => {},
}: Props) {
  return (
    <>
      <div
        onClick={close}
        className={cn(
          "absolute z-5 bg-black/50 w-screen h-screen pointer-events-none opacity-0 duration-300 transition-opacity",
          isOpen && "opacity-100 pointer-events-auto",
        )}
      />

      <Frame
        isSolid
        className={cn(
          "absolute z-10 left-[50%] top-[50%] -translate-[50%] rounded-xl flex-col p-4 scale-0 transition-transform duration-300",
          className,
          isOpen && "scale-100",
        )}
      >
        {canClose && (
          <Button
            variant="ghost"
            className="absolute right-5 top-7"
            onClick={close}
          >
            <X className="size-10" />
          </Button>
        )}
        {children}
      </Frame>
    </>
  );
}
