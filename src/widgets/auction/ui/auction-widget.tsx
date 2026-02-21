import { useGameStore } from "@/entities/game";
import { AuctionPlayerRow, useAuctionTable } from "@/features/auction";
import { COLOR_PRIMARY, COLOR_SUCCESS } from "@/shared/constants";
import { AuctionIcon, Frame } from "@/shared/ui";
import { useMemo } from "react";

export function AuctionWidget() {
  const { currentQuestion } = useGameStore();
  const { players, currentWinnerId } = useAuctionTable();

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => b.bet - a.bet);
  }, [players]);

  return (
    <Frame className="rounded-xl max-h-120 gap-6 flex-col p-4">
      <div className="flex justify-between w-full">
        <div className="flex gap-4 items-center">
          <AuctionIcon className="size-10" />
          <h2 className="text-2xl font-bold">Аукцион</h2>
        </div>

        <Frame className="w-70 p-2 text-xl rounded-lg">
          Тема: {currentQuestion?.themeLabel}
        </Frame>
      </div>

      <div className="flex flex-col gap-6 overflow-auto pr-3 custom-scroll">
        {sortedPlayers.map((player, index) => {
          const winnerColor =
            index === 0 && currentWinnerId > 0 ? COLOR_SUCCESS : COLOR_PRIMARY;

          return (
            <AuctionPlayerRow
              key={player.id}
              winnerColor={winnerColor}
              player={player}
            />
          );
        })}
      </div>
    </Frame>
  );
}
