export function generateCatInBagPositions(
  totalQuestions: number,
  count: number,
): number[] {
  const positions: number[] = [];
  const maxPositions = Math.min(count, totalQuestions);

  while (positions.length < maxPositions) {
    const pos = Math.floor(Math.random() * totalQuestions);
    if (!positions.includes(pos)) {
      positions.push(pos);
    }
  }

  return positions.sort((a, b) => a - b);
}
