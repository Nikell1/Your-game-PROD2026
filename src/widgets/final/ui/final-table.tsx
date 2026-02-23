import { useGameStore } from "@/entities/game";
import { EndingTable } from "./ending-table";
import { ProcessTable } from "./process-table";
import { useEffect } from "react";
import { useSound } from "@/features/sounds";

export function FinalTable() {
  const { status } = useGameStore();
  const { playLoopSound } = useSound();

  useEffect(() => {
    playLoopSound("categories");
  }, []);

  return <>{status === "ENDING" ? <EndingTable /> : <ProcessTable />}</>;
}
