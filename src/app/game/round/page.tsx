import { RoundRage } from "@/pages/round";
import { NO_INDEX_PAGE, PROJECT_NAME } from "@/shared/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Раунд 1`,
  ...NO_INDEX_PAGE,
};

export default function Round() {
  return <RoundRage />;
}
