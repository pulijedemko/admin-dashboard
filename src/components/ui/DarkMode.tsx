import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative w-16 h-8 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 flex items-center p-1 focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      {/* Slider */}
      <div
        className={`absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center
                    transition-transform duration-300 ${darkMode ? "translate-x-8" : "translate-x-0"}`}
      >
        {darkMode ? (
          <Moon className="w-4 h-4 text-yellow-300" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-400" />
        )}
      </div>
    </button>
  );
};
