"use client";

import { getRoundTitle, useGameStore } from "@/entities/game";
import { Header, HostWidget, PlayersList } from "@/widgets";
import { FinalTable } from "@/widgets/final";
import { ModalWidget } from "@/widgets/modal";

export function FinalRoundPage() {
  const { status } = useGameStore();
  const headerTitle = getRoundTitle(status);

  return (
    <>
      <Header title={headerTitle} />

      <div className="flex w-full p-8 flex-1">
        <HostWidget />
        <div className="flex-1 flex justify-center">
          <FinalTable />
        </div>
      </div>

      {status === "ENDING" ? (
        <div
          className="w-full h-30 absolute bottom-0 bg-accent/50 backdrop-blur-xs 
            border border-primary border-b-0 rounded-t-[80px]"
        />
      ) : (
        <PlayersList />
      )}
      <ModalWidget />
    </>
  );
}
