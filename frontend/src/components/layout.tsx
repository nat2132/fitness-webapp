import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, useSidebar } from "./sidebar-provider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/toaster";
import { cn } from "@/lib/utils";
import { inter } from "@/lib/fonts";

interface LayoutProps {
  children: React.ReactNode;
}

// New inner component that uses the context
function LayoutContent({ children }: LayoutProps) {
  const { isOpen, isMobile } = useSidebar();

  let marginLeftClass = "";
  if (!isMobile) {
    marginLeftClass = isOpen ? "lg:ml-60" : "lg:ml-14";
  }

  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased flex flex-col lg:flex-row", inter.className)}>
      <AppSidebar />
      <main className={cn("flex-1 w-full overflow-x-hidden transition-all duration-200 ease-in-out pb-16 lg:pb-0", marginLeftClass)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="fittrack-theme"
    >
      <SidebarProvider>
        <LayoutContent>{children}</LayoutContent>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
} 