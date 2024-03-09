"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme == 'light') setTheme("dark")
    else setTheme("light")
  }

  return (
    <Button variant='outline' onClick={toggleTheme} className={className}>
      {theme == 'light' ? 
        <>
          <span>Sunrise</span>
          <Sun size={18} className="mx-1" />
        </> : 
        <>
          <span>After hours</span>
          <Moon size={18} className="mx-1" />
        </>
      }
    </Button>
  )
}
