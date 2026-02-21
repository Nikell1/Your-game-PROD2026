import { NO_INDEX_PAGE, PROJECT_NAME } from "@/shared/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Победители`,
  ...NO_INDEX_PAGE,
};

export default function GameEnding() {
  return <GameEndingPage />;
}
