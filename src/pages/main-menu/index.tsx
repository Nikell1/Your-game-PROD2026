import { Badge, Button } from "@/shared/ui";
import { HexagonBackground } from "@/shared/ui/backgrounds";
import { Play, Swords } from "lucide-react";
import Link from "next/link";
import { ButtonList } from "./components/button-list";
import { PROJECT_NAME } from "@/shared/constants";
import { GAME_ROUTES } from "@/shared/config";

export function MainMenuPage() {
  return (
    <>
      <HexagonBackground className="w-full h-full absolute top-0 right-0 z-1" />

      <div className="relative z-2 w-full py-20 h-full overflow-hidden flex flex-col justify-between">
        <header className="flex items-center w-screen flex-col">
          <Swords size={60} />

          <div className="relative">
            <h1 className="text-4xl font-bold">{PROJECT_NAME.toUpperCase()}</h1>
            <Badge className="absolute -right-6 -top-2 rotate-25">Alpha</Badge>
          </div>

          <p className="mt-2 text-lg">Интеллектуальная викторина</p>
        </header>

        <main className="flex flex-col gap-40">
          <Button className="flex mx-auto scale-150 w-40" asChild>
            <Link className="flex items-center" href={GAME_ROUTES.SETUP}>
              <Play fill="white" />
              <span>Создать игру</span>
            </Link>
          </Button>

          <ButtonList />
        </main>

        <footer className="text-center text-white/50">Version: 0.0.1</footer>
      </div>
    </>
  );
}
