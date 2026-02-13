import { Badge } from "@/shared/ui";

function QuestionsTableTheme() {
  return (
    <div className="py-2 border px-4 flex gap-4 rounded-2xl">
      <span className="text-lg w-60">Вопросы от deepSeek</span>
      <Badge variant="secondary" className="text-lg px-4">
        100
      </Badge>
      <Badge variant="secondary" className="text-lg px-4">
        100
      </Badge>
      <Badge variant="secondary" className="text-lg px-4">
        100
      </Badge>
      <Badge variant="secondary" className="text-lg px-4">
        100
      </Badge>
      <Badge variant="secondary" className="text-lg px-4">
        100
      </Badge>
      <Badge variant="secondary" className="text-lg px-4">
        100
      </Badge>
    </div>
  );
}

export function QuestionsTable() {
  return (
    <div className="bg-accent/80 px-4 py-6 flex gap-4 flex-col w-200 rounded-xl mx-auto">
      <QuestionsTableTheme />
      <QuestionsTableTheme />
      <QuestionsTableTheme />
      <QuestionsTableTheme />
      <QuestionsTableTheme />
      <QuestionsTableTheme />
    </div>
  );
}
