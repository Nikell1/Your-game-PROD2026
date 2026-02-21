import { useGameStore } from "@/entities/game";
import { getPlayerById } from "@/shared/lib";
import { IActivePlayer } from "../player-types";

export function useFindPlayerInPlayers() {
  const { players } = useGameStore();

  return (id: number) => {
    return getPlayerById<IActivePlayer>(players, id);
  };
}
