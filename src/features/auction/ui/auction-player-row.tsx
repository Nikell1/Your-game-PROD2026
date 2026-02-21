import { Frame } from "@/shared/ui";
import { AuctionBetControls } from "./auction-bets-controls";
import { IAuctionPlayer } from "../auction-types";

interface Props {
  player: IAuctionPlayer;
  winnerColor: string;
}

export function AuctionPlayerRow({ player, winnerColor }: Props) {
  return (
    <div className="w-full flex gap-4">
      <Frame className="py-2 px-6 text-2xl rounded-lg w-80" color={winnerColor}>
        {player.name}
      </Frame>
      <Frame color={winnerColor} className="py-2 px-6 text-2xl rounded-lg w-51">
        Ставка: {player.bet}
      </Frame>
      <AuctionBetControls player={player} winnerColor={winnerColor} />
    </div>
  );
}
