import { IActivePlayer } from "../player.types";
import { PlayerCardWrapper } from "./player-card-wrapper";

interface PlayerActiveCardProps {
  player: IActivePlayer;
  children: React.ReactNode;
}

export function PlayerActiveCard({ player, children }: PlayerActiveCardProps) {
  return (
    <PlayerCardWrapper player={player} className="!border-b-0 rounded-b-none">
      <p className="text-2xl font-medium" style={{ color: player.color }}>
        {player.name}
      </p>

      <p className="text-3xl">{player.key}</p>

      {children}
    </PlayerCardWrapper>
  );
}
