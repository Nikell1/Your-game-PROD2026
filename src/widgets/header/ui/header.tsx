import { LogOut, Settings } from "lucide-react";

export function Header({ title }: { title: string }) {
  return (
    <header className="w-full flex justify-between py-6 px-12">
      <LogOut size={35} />
      <h1 className="text-3xl bg-accent py-3 px-8 rounded-full">{title}</h1>
      <Settings size={35} />
    </header>
  );
}
