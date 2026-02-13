export function HeaderTitle({ title }: { title: string }) {
  return (
    <header className="w-screen bg-sidebar py-6 flex-1">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
    </header>
  );
}
