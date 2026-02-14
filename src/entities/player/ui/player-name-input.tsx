import { Input } from "@/shared/ui";
import { ISetupPlayer } from "../player.types";
import { MAX_NAME_LENGTH } from "../player.constants";

interface PlayerNameInputProps {
  player: ISetupPlayer;
  index: number;
  onNameChange: (index: number, name: string) => void;
}

export function PlayerNameInput({
  player,
  onNameChange,
  index,
}: PlayerNameInputProps) {
  return (
    <Input
      onChange={(e) => onNameChange(index, e.target.value)}
      value={player.name}
      placeholder="Имя игрока"
      className="border text-center text-xl!"
      maxLength={MAX_NAME_LENGTH}
      style={{
        color: player.color,
        borderColor: player.color,
      }}
    />
  );
}
