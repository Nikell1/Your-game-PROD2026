import { Button } from "@/shared/ui";

export function PlayerEditBtn({ playerColor }: { playerColor: string }) {
  return (
    <Button variant="ghost" className=" text-md" style={{ color: playerColor }}>
      Редактировать профиль
    </Button>
  );
}
