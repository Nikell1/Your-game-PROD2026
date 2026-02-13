import { Button } from "@/shared/ui";
import Link from "next/link";
import { mainMenuButtonsData } from "./button-list.data";

export function ButtonList() {
  return (
    <nav className="flex flex-wrap gap-x-12 gap-y-10 justify-center max-w-200 mx-auto">
      {mainMenuButtonsData.map((item) => (
        <Button key={item.href} size="xl" className="text-lg w-40" asChild>
          <Link href={item.href}>
            <item.icon />
            <span>{item.label}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );
}
