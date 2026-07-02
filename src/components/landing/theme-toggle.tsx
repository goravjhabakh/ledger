/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { cn } from "@/lib/utils"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const themes = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "system", icon: Monitor, label: "System" },
  { value: "dark", icon: Moon, label: "Dark" },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="bg-muted relative flex h-10 w-36 rounded-xl border" />
  }

  const activeIndex = themes.findIndex((t) => t.value === theme)

  return (
    <div className="bg-muted relative flex h-11 w-36 rounded-xl border p-1">
      <div
        className="bg-background absolute top-1 bottom-1 w-[calc((100%-0.5rem)/3)] rounded-lg shadow-sm transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(calc(${activeIndex} * 100%))` }}
      />

      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          aria-label={label}
          className={cn(
            "relative z-10 flex flex-1 items-center justify-center rounded-lg transition-colors",
            theme === value ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  )
}
