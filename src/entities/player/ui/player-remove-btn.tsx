import { Button } from "@/shared/ui";
import { Trash2 } from "lucide-react";

interface PlayerRemoveBtnProps {
  isDisabled: boolean;
  onPlayerRemove: (index: number) => void;
  index: number;
  playerColor: string;
}

export function PlayerRemoveBtn({
  isDisabled,
  onPlayerRemove,
  index,
  playerColor,
}: PlayerRemoveBtnProps) {
  return (
    <Button
      variant="ghost"
      disabled={isDisabled}
      className="absolute right-1 top-3"
      onClick={() => onPlayerRemove(index)}
    >
      <Trash2 style={{ color: playerColor }} className="size-6" />
    </Button>
  );
}
