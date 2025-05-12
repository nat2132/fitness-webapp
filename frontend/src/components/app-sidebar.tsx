import type React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Heart,
  Home,
  LogOut,
  Menu,
  Settings,
  Trophy,
  User,
  Utensils,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/sidebar-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define the sidebar link type
interface SidebarLink {
  name: string
  href: string
  icon: React.ElementType
  description?: string
}

// Define the sidebar links
const sidebarLinks: SidebarLink[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Overview of your fitness journey",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    description: "Manage your personal information",
  },
  {
    name: "Activity",
    href: "/log/activity",
    icon: Activity,
    description: "Log your workouts and activities",
  },
  {
    name: "Progress",
    href: "/progress",
    icon: BarChart3,
    description: "Track your fitness progress",
  },
  {
    name: "Achievements",
    href: "/achievements",
    icon: Trophy,
    description: "View your fitness milestones",
  },
  {
    name: "Workouts",
    href: "/workouts",
    icon: Dumbbell,
    description: "Browse and create workout plans",
  },
  {
    name: "Meals",
    href: "/meal",
    icon: Utensils,
    description: "Track your nutrition and meals",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Configure app preferences",
  },
]

// Excluded paths where sidebar should not be shown
const excludedPaths = ["/login", "/register", "/forgot-password", "/reset-password", "/"]

export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isOpen, setIsOpen, isMobile } = useSidebar()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't show sidebar on excluded paths
  if (!mounted || excludedPaths.includes(location.pathname)) {
    return null
  }

  const isActive = (href: string) => {
    // Special case: make /workouts active for /workouts/create and /workouts/:id
    if (href === "/workouts") {
      return (
        location.pathname === "/workouts" ||
        location.pathname.startsWith("/workouts/")
      );
    }
    // Special case: make /meal active for /log/meal paths
    if (href === "/meal") {
      return (
        location.pathname === "/meal" ||
        location.pathname.startsWith("/meal/") ||
        location.pathname === "/log/meal" ||
        location.pathname.startsWith("/log/meal/")
      );
    }
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  }

  const handleLogout = () => {
    // Show toast first
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    
    // Delay navigation to give toast time to appear
    setTimeout(() => {
      navigate("/login")
    }, 1500)
  }

  return (
    <>
      {isMobile ? (
        <MobileSidebar links={sidebarLinks} isActive={isActive} handleLogout={handleLogout} />
      ) : (
        <DesktopSidebar
          links={sidebarLinks}
          isActive={isActive}
          handleLogout={handleLogout}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  )
}

// Mobile sidebar component
function MobileSidebar({
  links,
  isActive,
  handleLogout,
}: {
  links: SidebarLink[]
  isActive: (href: string) => boolean
  handleLogout: () => void
}) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b bg-background px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 max-w-[80vw]">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center justify-between border-b px-4">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-primary" />
                  <span className="font-bold">FitTrack</span>
                </Link>
                <ThemeToggle />
              </div>
              <nav className="flex-1 overflow-auto py-2 px-1" aria-label="Main navigation">
                <ul className="grid gap-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive(link.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                        )}
                        aria-current={isActive(link.href) ? "page" : undefined}
                      >
                        <link.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                        <span className="truncate">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t p-3">
                <Button variant="outline" className="w-full justify-start" onClick={handleLogout} aria-label="Log out">
                  <LogOut className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  Log out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden">
          <Heart className="h-6 w-6 text-primary shrink-0" />
          <span className="font-bold truncate">FitTrack</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <UserDropdown />
        </div>
      </div>
      <div className="h-14" />
    </>
  )
}

// Desktop sidebar component
function DesktopSidebar({
  links,
  isActive,
  handleLogout,
  isOpen,
  setIsOpen,
}: {
  links: SidebarLink[]
  isActive: (href: string) => boolean
  handleLogout: () => void
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r bg-background"
          >
            <div className="flex h-14 items-center justify-between border-b px-4">
              <Link to="/dashboard" className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold">FitTrack</span>
              </Link>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => setIsOpen(false)}
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <nav className="flex-1 overflow-auto p-2" aria-label="Main navigation">
              <ul className="grid gap-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive(link.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                      )}
                      aria-current={isActive(link.href) ? "page" : undefined}
                    >
                      <link.icon className="h-5 w-5" aria-hidden="true" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t  p-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout} aria-label="Log out">
                <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                Log out
              </Button>
            </div>
          </motion.aside>
        ) : (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 56, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-y-0 left-0 z-50 flex w-14 flex-col border-r bg-background"
          >
            <div className="flex h-14 items-center justify-center border-b">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Expand sidebar">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <TooltipProvider delayDuration={300}>
              <nav className="flex-1 overflow-auto py-2" aria-label="Main navigation">
                <ul className="grid gap-1 px-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to={link.href}
                            className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                              isActive(link.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                            )}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            aria-label={link.name}
                          >
                            <link.icon className="h-5 w-5" aria-hidden="true" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{link.name}</p>
                          {link.description && <p className="text-xs text-muted-foreground">{link.description}</p>}
                        </TooltipContent>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </nav>
            </TooltipProvider>
            <div className="border-t p-2">
              <div className="flex flex-col items-center gap-2">
                <ThemeToggle />
                <UserDropdown side="right" />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

// User dropdown component
function UserDropdown({ side = "bottom" }: { side?: "bottom" | "right" }) {
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
          <Avatar className={side === "bottom" ? "h-8 w-8" : "h-9 w-9"}>
            <AvatarImage
              src={`/placeholder.svg?height=${side === "bottom" ? "32" : "36"}&width=${side === "bottom" ? "32" : "36"}`}
              alt="User"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side={side}>
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            toast({
              title: "Logged out",
              description: "You have been successfully logged out.",
            })
            // Delay navigation to give toast time to appear
            setTimeout(() => {
              navigate("/login")
            }, 1500)
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}