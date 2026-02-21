import {
  IActivePlayer,
  IFinalAnsweredPlayer,
  IFinalBet,
} from "@/entities/player";
import { produce } from "immer";
import { StateCreator } from "zustand";

export interface GamePlayersSlice {
  players: IActivePlayer[];
  activePlayerId: number | null;
  prevActivePlayerId: number | null;
  finalBets: IFinalBet[];
  answeredPlayersIds: IFinalAnsweredPlayer[];

  pushFinalBets: (finalBet: IFinalBet) => void;
  setPlayers: (players: IActivePlayer[]) => void;
  setActivePlayerId: (id: number | null) => void;
  setPrevActivePlayerId: (id: number | null) => void;
  getPlayerWithMinScore: () => IActivePlayer | undefined;
  setFinalAnswers: (correct: boolean) => void;
  resetAnsweredPlayers: () => void;
}

export const gamePlayersSlice: StateCreator<GamePlayersSlice> = (set, get) => ({
  players: [],
  activePlayerId: null,
  prevActivePlayerId: null,
  finalBets: [],
  answeredPlayersIds: [],

  resetAnsweredPlayers: () => set({ answeredPlayersIds: [] }),

  pushFinalBets: (finalBet) =>
    set((state) => ({
      finalBets: [...state.finalBets, finalBet],
    })),

  getPlayerWithMinScore: () => {
    const { players } = get();
    if (players.length === 0) return undefined;

    return players.reduce((min, player) =>
      player.score < min.score ? player : min,
    );
  },

  setPlayers: (players) => set({ players: players }),

  setActivePlayerId: (id) => set({ activePlayerId: id }),

  setPrevActivePlayerId: (id) => set({ prevActivePlayerId: id }),

  setFinalAnswers: (correct: boolean) =>
    set(
      produce((state: GamePlayersSlice) => {
        if (state.activePlayerId === null) {
          console.warn("Нет активного игрока для ответа");
          return;
        }

        const currentPlayerId = state.activePlayerId;

        state.answeredPlayersIds.push({
          id: currentPlayerId,
          isCorrect: correct,
        });

        const nextPlayer = state.players.find(
          (player) =>
            !state.answeredPlayersIds.some(
              (answered) => answered.id === player.id,
            ),
        );

        state.activePlayerId = nextPlayer?.id ?? null;
      }),
      false,
    ),
});
