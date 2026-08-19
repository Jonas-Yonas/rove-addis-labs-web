"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, FolderKanban, LayoutDashboard, Menu, Package, Settings } from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Products", href: "/dashboard/products", icon: Package },
  { label: "Labs", href: "/dashboard/labs", icon: FlaskConical },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-16 z-20 border-b bg-background/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Sheet>
            <SheetTrigger
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border bg-background text-foreground lg:hidden"
              aria-label="Open dashboard navigation"
            >
              <Menu className="size-4" />
            </SheetTrigger>

            <SheetContent side="left" className="w-72 px-4">
              <SheetHeader className="border-b pb-4 text-left">
                <SheetTitle>Workspace</SheetTitle>
              </SheetHeader>
              <nav className="space-y-1 pt-5" aria-label="Dashboard navigation">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold">Dashboard</h1>
          <p className="truncate text-xs text-muted-foreground">
            Rove Addis Labs workspace
          </p>
          </div>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}
