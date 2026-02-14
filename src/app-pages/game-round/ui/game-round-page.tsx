"use client";

import { Header, HostWidget, QuestionsTable, PlayersList } from "@/widgets";
import { useParams } from "next/navigation";

export function GameRoundPage() {
  const { id } = useParams();

  const headerTitle =
    id === "1" || id === "2" ? `Раунд ${id}` : "Финальный раунд";

  return (
    <>
      <Header title={headerTitle} />

      <div className="flex w-full">
        <HostWidget />
        <QuestionsTable />
      </div>

      <PlayersList />
    </>
  );
}
