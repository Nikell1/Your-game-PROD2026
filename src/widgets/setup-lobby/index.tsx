import { PlayerCard } from "@/entities/player/player-card";
import { GAME_ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";
import { Play, Plus } from "lucide-react";
import Link from "next/link";

export function SetupLobby() {
  return (
    <form className="flex flex-col justify-around flex-18 py-20">
      <div className="flex flex-wrap gap-12 justify-center">
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
      </div>

      <div className="flex gap-12 w-160 mx-auto">
        <Button variant="secondary" size="xl" className="flex-2 text-md">
          <Plus />
          <span>Добавить игрока</span>
        </Button>

        <Button className="w-full text-md" size="xl" asChild>
          <Link href={GAME_ROUTES.ROUND} className="flex-2">
            <Play fill="white" />
            <span>Начать</span>
          </Link>
        </Button>
      </div>
    </form>
  );
}
