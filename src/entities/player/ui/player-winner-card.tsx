import { Frame } from "@/shared/ui";
import { IActivePlayer } from "../player-types";
import { cn } from "@/shared/lib";
import { PlayerCardWrapper } from "./player-card-wrapper";
import { COLOR_PRIMARY } from "@/shared/constants";

interface Props {
  player: IActivePlayer;
  place: number;
}

export function PlayerWinnerCard({ player, place }: Props) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <PlayerCardWrapper player={player}>
        <p
          className="text-2xl font-medium leading-6 text-center"
          style={{ color: player?.color || COLOR_PRIMARY }}
        >
          {player?.name}
        </p>
        <div
          className="flex relative gap-4 bg-background/10 border rounded-lg items-center justify-between my-1 w-full py-0.5"
          style={{ borderColor: player?.color || COLOR_PRIMARY }}
        >
          <p className="text-xl w-full text-center py-1">{player?.score}</p>
        </div>
      </PlayerCardWrapper>
      <Frame
        color={player?.color}
        className={cn(
          "w-65 rounded-lg text-8xl items-center justify-center",
          place === 1 ? "h-70" : "h-40",
        )}
      >
        {place}
      </Frame>
    </div>
  );
}
