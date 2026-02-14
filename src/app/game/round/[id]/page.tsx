import { GameRoundPage } from "@/app-pages";
import { NO_INDEX_PAGE, PROJECT_NAME } from "@/shared/constants";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `${PROJECT_NAME} | Раунд ${id}`,
    ...NO_INDEX_PAGE,
  };
}

export default function Round() {
  return <GameRoundPage />;
}
