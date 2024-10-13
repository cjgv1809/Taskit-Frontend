import { useContext } from "react";
import { Switch } from "./ui/switch";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "@/context";

function DarkModeSwitch() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)!;

  return (
    <>
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        className="dark:bg-white"
      />
      <div className="flex items-center">
        {isDarkMode ? (
          <Sun size={24} className="text-accent" />
        ) : (
          <Moon size={24} className="text-accent" />
        )}
      </div>
    </>
  );
}

export default DarkModeSwitch;
