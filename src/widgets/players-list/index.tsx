function PlayerCard() {
  return (
    <div className="bg-sidebar">
      <h4>Игрок 1</h4>
      <p>Счёт: 1200</p>
      <span>Клавиша</span>
      <span>[ A ]</span>
    </div>
  );
}

export function PlayersList() {
  return (
    <div className="bg-accent w-full p-4 flex justify-center gap-12">
      <PlayerCard />
      <PlayerCard />
      <PlayerCard />
    </div>
  );
}
