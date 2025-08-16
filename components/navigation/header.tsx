"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Bell, Search, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-primary/20 glass-effect px-6">
      <div className="flex flex-1 items-center gap-4 md:ml-64">
        <div className={cn("relative flex-1 max-w-md transition-all duration-300", searchFocused ? "scale-105" : "")}>
          <Search
            className={cn(
              "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300",
              searchFocused ? "text-primary" : "text-muted-foreground",
            )}
          />
          <Input
            placeholder="Search patients, appointments..."
            className={cn(
              "pl-10 transition-all duration-300 border-primary/20",
              "focus:border-primary/50 focus:shadow-lg focus:shadow-primary/20",
              "hover:border-primary/30",
            )}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {searchFocused && <div className="absolute inset-0 rounded-md animate-pulse-glow pointer-events-none" />}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative interactive-button group">
            <Bell className="h-5 w-5 group-hover:text-primary transition-colors duration-300" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-primary animate-bounce-in border-2 border-background">
              3
            </Badge>
            <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          <Button variant="ghost" size="icon" className="interactive-button group">
            <Settings className="h-5 w-5 group-hover:text-primary group-hover:rotate-90 transition-all duration-300" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full interactive-button group">
                <Avatar className="h-10 w-10 transition-all duration-300 group-hover:scale-110">
                  <AvatarImage src="/caring-doctor.png" alt="Dr. Smith" />
                  <AvatarFallback className="bg-primary/10 text-primary">DS</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 glass-effect border-primary/20 animate-slide-up"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Dr. Sarah Smith</p>
                  <p className="text-xs leading-none text-muted-foreground">Chief Medical Officer</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-primary/20" />
              <DropdownMenuItem className="hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-primary/20" />
              <DropdownMenuItem className="hover:bg-destructive/10 hover:text-destructive transition-colors duration-200">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
