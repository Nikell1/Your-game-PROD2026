import { IActivePlayer, PlayerActiveCard } from "@/entities/player";
import { ScoreControls } from "@/features/manage-user-score";
import { COLOR_PRIMARY } from "@/shared/constants";
import { TModalState } from "@/shared/model";
import { Button, Frame } from "@/shared/ui";

interface Props {
  playersWithoutBet: IActivePlayer[];
  setModalState: (state: TModalState) => void;
}

export function PlayersBets({ playersWithoutBet, setModalState }: Props) {
  const buttonColor = playersWithoutBet[0]?.color || COLOR_PRIMARY;

  return (
    <div className="flex flex-col gap-3 relative overflow-auto custom-scroll h-full pt-2">
      <div className="flex flex-wrap gap-x-6 gap-y-18">
        {playersWithoutBet.map((player) => (
          <PlayerActiveCard
            isBottom={false}
            key={player.id}
            player={player}
            isActive={false}
          >
            <ScoreControls player={player} />
          </PlayerActiveCard>
        ))}
      </div>
      <Frame color={buttonColor} className="w-50 rounded-lg absolute top-72">
        <Button
          className="w-full hover:bg-foreground/5"
          variant="ghost"
          onClick={() => setModalState("final_bet")}
        >
          Сделать ставку
        </Button>
      </Frame>
    </div>
  );
}
