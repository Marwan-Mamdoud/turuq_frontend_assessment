"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setTheme } from "@/actions/theme";

interface ThemeToggleProps {
  initialTheme: "light" | "dark";
}

export function ThemeToggle({ initialTheme }: ThemeToggleProps) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(initialTheme);

  const toggleTheme = async () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    await setTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-10 w-10"
      aria-label="Toggle theme"
    >
      {currentTheme === "light" ? (
        <Moon className="h-5 w-5 transition-transform duration-300" />
      ) : (
        <Sun className="h-5 w-5 transition-transform duration-300" />
      )}
    </Button>
  );
}
