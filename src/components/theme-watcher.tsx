import { useEffect } from "react";
import { useApp, resolveMode } from "../store";

export default function ThemeWatcher() {
    const mode = useApp(x => resolveMode(x.mode));

    useEffect(() => {
      document.documentElement.classList.toggle("dark", mode === "dark");
    }, [mode]);

    return null;
}
