import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomItems<T>(array: T[], n: number): T[] {
  if (!array.length) return [];
  if (n >= array.length) return [...array].sort(() => Math.random() - 0.5);

  const result: T[] = [];
  const copy = [...array];

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    result.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
  }

  return result;
}
