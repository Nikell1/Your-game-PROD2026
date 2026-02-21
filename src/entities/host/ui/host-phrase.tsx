import { Frame } from "@/shared/ui";
import Typewriter from "react-ts-typewriter";
import { useHostPhrases } from "../lib/use-host-phrases";

export function HostPhrase() {
  const { currentPhrase } = useHostPhrases();

  return (
    <Frame className="rounded-lg size-60 p-4">
      <p className="text-xl">
        <Typewriter
          text={currentPhrase}
          key={currentPhrase}
          cursor={false}
          speed={10}
        />
      </p>
    </Frame>
  );
}
