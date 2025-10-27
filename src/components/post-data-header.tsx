import { IconFile, IconSettings } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import DarkModeToggle from "./dark-mode-toggle"
import Title from "./title";

export default function PostDataFooter() {
  return (
    <header className="flex items-center justify-center py-4">
        <div className="w-full flex flex-row items-center justify-between px-4 border-2 border-dashed border-border rounded-sm inset-shadow-sm inset-shadow-secondary/5">
          <Title />
          <div className="flex flex-row items-center justify-center">
              <DarkModeToggle />
              <Button className="bg-transparent hover:bg-transparent"><IconFile className="text-primary" /></Button>
              <Button className="bg-transparent hover:bg-transparent"><IconSettings className="text-primary" /></Button>
          </div>
        </div>

    </header>
  );
}
