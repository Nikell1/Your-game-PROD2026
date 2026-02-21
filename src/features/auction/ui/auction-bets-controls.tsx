import { Button, Frame } from "@/shared/ui";
import { IAuctionPlayer } from "../auction-types";
import { DEFAULT_AUCTION_STEP } from "../auction-constants";
import { useAuctionTable } from "../lib/use-auction-table";

interface Props {
  player: IAuctionPlayer;
  winnerColor: string;
}

export function AuctionBetControls({ player, winnerColor }: Props) {
  const {
    currentWinnerBet,
    currentWinnerId,
    isBetAll,
    playerPass,
    addBetToPlayer,
    betAll,
  } = useAuctionTable();

  const isPassDisabled =
    currentWinnerId < 0 || player.isPassed || currentWinnerId === player.id;
  const isAddBetDisabled =
    player.isPassed || player.score <= currentWinnerBet || isBetAll;
  const isBetAllDisabled = player.isPassed || player.score <= currentWinnerBet;

  return (
    <Frame color={winnerColor} className="gap-14 rounded-lg py-2 px-4">
      <Button
        disabled={isPassDisabled}
        onClick={() => playerPass(player.id)}
        className="border-foreground bg-foreground/15 hover:bg-foreground/30"
      >
        Пас
      </Button>
      <Button
        onClick={() =>
          addBetToPlayer(player.id, player.bet + DEFAULT_AUCTION_STEP)
        }
        disabled={isAddBetDisabled}
        className="border-success bg-success/15 hover:bg-success/30"
      >
        Добавить
      </Button>
      <Button
        onClick={() => betAll(player.id, player.score)}
        className="border-destructive bg-destructive/15 hover:bg-destructive/30"
        disabled={isBetAllDisabled}
      >
        Ва-банк
      </Button>
    </Frame>
  );
}
