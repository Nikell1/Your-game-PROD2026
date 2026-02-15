import { QuestionPage } from "@/app-pages";
import { NO_INDEX_PAGE, PROJECT_NAME } from "@/shared/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Вопрос`,
  ...NO_INDEX_PAGE,
};

export default function Question() {
  return <QuestionPage />;
}
