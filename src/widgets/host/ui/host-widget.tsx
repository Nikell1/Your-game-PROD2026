import { useGameStore } from "@/entities/game";
import { Timer } from "@/features/timer";
import { Frame } from "@/shared/ui";
import Image from "next/image";

export function HostWidget() {
  const {currentQuestion} = useGameStore()

  return (
    <div className="flex flex-col h-full justify-between items-center relative z-3 shrink-0">
      <div>
        <Frame className="rounded-lg size-60">
          <p className="text-xl">Олег, выбирайте вопрос</p>
        </Frame>
      
        {currentQuestion && <Timer />}
      </div>

      <Image
        className="relative -bottom-5"
        src="/host-image.png"
        width={193}
        height={483}
        alt="Ведущий"
        loading="eager"
      />

    </div>
  );
}
