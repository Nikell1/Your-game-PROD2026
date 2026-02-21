import { useGameStore } from "@/entities/game";
import { EndingTable } from "./ending-table";
import { ProcessTable } from "./process-table";

export function FinalTable() {
  const { status } = useGameStore();

  return <>{status === "ENDING" ? <EndingTable /> : <ProcessTable />}</>;
}
