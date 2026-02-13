import { HeaderTitle } from "@/shared/ui";
import { PlayersList } from "@/widgets/players-list";
import { QuestionsTable } from "@/widgets/questions-table";

export function RoundRage() {
  return (
    <>
      <HeaderTitle title="Раунд 1" />

      <div className="flex flex-18 pt-20 flex-col justify-between">
        <QuestionsTable />

        <PlayersList />
      </div>
    </>
  );
}
