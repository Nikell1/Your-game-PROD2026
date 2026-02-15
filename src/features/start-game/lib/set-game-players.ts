import {
  IActivePlayer,
  ISetupPlayer,
  PLAYERS_KEYS_LIST,
} from "@/entities/player";

interface Props {
  playersData: ISetupPlayer[];
  setPlayers: (players: IActivePlayer[]) => void;
}

export function setGamePlayers({ playersData, setPlayers }: Props) {
  const activePlayers: IActivePlayer[] = playersData.map((player, index) => ({
    ...player,
    id: index,
    key: PLAYERS_KEYS_LIST[index].label,
    score: 0,
    isActive: index === 0,
  }));

  setPlayers(activePlayers);
}
