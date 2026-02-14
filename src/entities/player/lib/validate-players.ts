export const validatePlayers = (
  playersData: Array<{ name: string }>,
): boolean => {
  const names = playersData
    .map((p) => p.name.trim())
    .filter((name) => name.length > 0);
  const lowerCaseNames = names.map((name) => name.toLowerCase());

  return (
    names.length === playersData.length &&
    names.length === new Set(lowerCaseNames).size
  );
};
