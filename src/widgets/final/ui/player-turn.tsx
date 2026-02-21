import { IActivePlayer } from "@/entities/player";
import { Button, Frame } from "@/shared/ui";

interface Props {
  answeringPlayer: IActivePlayer | undefined;
  finalQuestionClick: () => void;
}

export function PlayerTurn({ answeringPlayer, finalQuestionClick }: Props) {
  return (
    <div className="flex flex-col items-center gap-12">
      <Frame className="flex-col gap-4 items-center w-120 rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center">
          Очередь игрока {answeringPlayer?.name}
        </h2>
        <p className="text-xl">Не подглядывайте за отвечающим!</p>
      </Frame>

      <Button
        onClick={() => finalQuestionClick()}
        size="xl"
        className="text-2xl"
      >
        Готов
      </Button>
    </div>
  );
}
