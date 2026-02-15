import { Frame } from "@/shared/ui";
import Image from "next/image";

export function HostWidget() {
  return (
    <div className="flex flex-col h-full justify-between items-center relative z-3 shrink-0">
      <Frame className="rounded-lg size-60">
        <p className="text-xl">Олег, выбирайте вопрос</p>
      </Frame>

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
