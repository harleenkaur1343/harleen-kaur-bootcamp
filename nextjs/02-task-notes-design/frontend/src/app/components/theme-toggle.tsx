// import { useTheme } from "next-themes";
// import { Button } from "@/components/ui/button";

// export function ThemeToggle(){
//   const {theme, setTheme} = useTheme();
//   return(
//     <Button
//       variant="outline"
//       onClick={()=>setTheme(theme === "dark"? "light" : "dark")}
//     >Toggle Theme</Button>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle(){
const [theme, setTheme] = useState<'light' | 'dark'>('light');  // this only runs ONCE on mount
 
  useEffect(() => {
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="transition-all duration-200"
    >
      {theme === 'light' ? (
        <Moon style={{color:'black'}}className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}