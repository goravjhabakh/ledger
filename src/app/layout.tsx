import type { Metadata } from "next"
import { Montserrat, Merriweather, Ubuntu_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
})

const fontMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Ledger",
  description: "Personal finance tracker — track income, expenses, budgets, and savings.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        fontSans.variable,
        fontSerif.variable,
        fontMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
