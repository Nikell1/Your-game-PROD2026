import { IActivePlayer } from "@/entities/player";
import { Button } from "@/shared/ui";

interface ScoreControlsProps {
  player: IActivePlayer;
}

export function ScoreControls({ player }: ScoreControlsProps) {
  return (
    <div
      className="flex gap-4 bg-background/10 border"
      style={{ borderColor: player.color }}
    >
      <Button variant="ghost">-</Button>
      <p>{player.score}</p>
      <Button variant="ghost">+</Button>
    </div>
  );
}
