import { IActivePlayer } from "@/entities/player";
import { Button } from "@/shared/ui";

interface ScoreControlsProps {
  player: IActivePlayer;
}

export function ScoreControls({ player }: ScoreControlsProps) {
  return (
    <div
      className="flex gap-4 bg-background/10 border rounded-lg items-center justify-center my-2 w-full py-0.5"
      style={{ borderColor: player.color }}
    >
      <Button variant="ghost" className="text-3xl relative -top-0.75">
        -
      </Button>
      <p className="text-xl">9999</p>
      <Button variant="ghost" className="text-3xl relative -top-0.75">
        +
      </Button>
    </div>
  );
}
