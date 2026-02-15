export type GameStatus =
  | "NOT_STARTED"
  | "CREATING"
  | "ROUND_1"
  | "ROUND_2"
  | "FINAL_ROUND"
  | "ENDING"
  | "FINISHED";

export interface ITheme {
  id: string;
  label: string;
}
