import {
  AUCTIONS_COUNT,
  CATS_COUNT,
  QUESTIONS_COUNT,
  SpecialPosition,
  THEMES_COUNT,
} from "@/entities/game";
import { getRandomCellPositions } from "./generate-positions";

export function getSpecialPositions(): SpecialPosition[] {
  const totalSpecials = CATS_COUNT + AUCTIONS_COUNT;
  const allPositions = getRandomCellPositions(
    THEMES_COUNT,
    QUESTIONS_COUNT,
    totalSpecials,
  );

  const types = [
    ...Array(CATS_COUNT).fill("cat"),
    ...Array(AUCTIONS_COUNT).fill("auction"),
  ].sort(() => Math.random() - 0.5);

  return allPositions.map((pos, index) => ({
    ...pos,
    type: types[index] as "cat" | "auction",
  }));
}
