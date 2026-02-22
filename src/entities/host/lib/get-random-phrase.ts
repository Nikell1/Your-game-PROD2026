import phrasesData from "../../../../public/data/host-phrases.json";
import { IHostPhrase, THostEvents } from "../host-types";

export interface GetRandomPhraseOptions {
  eventType: THostEvents;
  playerName?: string | null;
  excludeLastId?: string | null;
  price?: number;
  bet?: number;
  correctAnswer?: string;
}

const HOST_PHRASES = phrasesData as IHostPhrase[];

export function getRandomPhrase({
  eventType,
  playerName,
  excludeLastId,
  correctAnswer,
  price,
  bet,
}: GetRandomPhraseOptions): IHostPhrase | null {
  let phrases = HOST_PHRASES.filter((p) => p.eventType === eventType);

  if (excludeLastId) {
    const filtered = phrases.filter((p) => p.id !== excludeLastId);
    if (filtered.length > 0) {
      phrases = filtered;
    }
  }

  const randomIndex = Math.floor(Math.random() * phrases.length);
  const phrase = { ...phrases[randomIndex] };

  if (playerName) {
    phrase.label = phrase.label.replace(/\{name\}/g, playerName);
  }

  if (price) {
    phrase.label = phrase.label.replace(/\{price\}/g, price.toString());
  }

  if (bet) {
    phrase.label = phrase.label.replace(/\{bet\}/g, bet.toString());
  }
  if (correctAnswer) {
    phrase.label = phrase.label.replace(
      /\{correctAnswer\}/g,
      correctAnswer.toString(),
    );
  }

  return phrase;
}
