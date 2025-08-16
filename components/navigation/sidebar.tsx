"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Activity,
  Calendar,
  Users,
  FileText,
  DollarSign,
  Pill,
  TestTube,
  Bed,
  AlertTriangle,
  BarChart3,
  Menu,
  X,
  Stethoscope,
  Heart,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Activity,
  },
  {
    name: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: Calendar,
  },
  {
    name: "Medical Records",
    href: "/records",
    icon: FileText,
  },
  {
    name: "Doctors & Staff",
    href: "/staff",
    icon: Stethoscope,
  },
  {
    name: "Billing",
    href: "/billing",
    icon: DollarSign,
  },
  {
    name: "Pharmacy",
    href: "/pharmacy",
    icon: Pill,
  },
  {
    name: "Laboratory",
    href: "/laboratory",
    icon: TestTube,
  },
  {
    name: "In-Patient",
    href: "/inpatient",
    icon: Bed,
  },
  {
    name: "Emergency",
    href: "/emergency",
    icon: AlertTriangle,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden interactive-button hover:bg-primary/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 glass-effect border-r border-primary/20 transition-all duration-500 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-primary/20 px-6 group">
          <div className="relative">
            <Heart className="h-8 w-8 text-primary animate-float group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-sidebar-foreground group-hover:text-primary transition-colors duration-300">
              MediCare
            </span>
            <span className="text-xs text-muted-foreground">Hospital Management</span>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 group relative overflow-hidden animate-slide-up",
                    "hover:bg-primary/10 hover:text-primary hover:translate-x-1 hover:shadow-lg hover:shadow-primary/20",
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/30 shadow-md"
                      : "text-sidebar-foreground hover:border hover:border-primary/20",
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative">
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-all duration-300",
                        isActive ? "text-primary scale-110" : "group-hover:scale-110 group-hover:text-primary",
                      )}
                    />
                    {isActive && <div className="absolute inset-0 rounded-full animate-pulse-glow" />}
                  </div>

                  <span className="group-hover:animate-shimmer relative z-10">{item.name}</span>

                  {isActive && <div className="absolute right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />}

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
