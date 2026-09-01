// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FlaskConical,
//   FolderKanban,
//   LayoutDashboard,
//   Package,
//   Settings,
// } from "lucide-react";

// const navigation = [
//   {
//     label: "Overview",
//     href: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     label: "Projects",
//     href: "/dashboard/projects",
//     icon: FolderKanban,
//   },
//   {
//     label: "Products",
//     href: "/dashboard/products",
//     icon: Package,
//   },
//   {
//     label: "Labs",
//     href: "/dashboard/labs",
//     icon: FlaskConical,
//   },
//   {
//     label: "Settings",
//     href: "/dashboard/settings",
//     icon: Settings,
//   },
// ];

// export function DashboardSidebar() {
//   const pathname = usePathname();

//   return (
//     <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col">
//       <div className="flex-1 overflow-y-auto px-3 py-5">
//           <p className="mb-3 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
//             Workspace
//           </p>

//           <nav className="space-y-1">
//             {navigation.map((item) => {
//               const Icon = item.icon;

//               const active =
//                 pathname === item.href ||
//                 (item.href !== "/dashboard" &&
//                   pathname.startsWith(`${item.href}/`));

//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={[
//                     "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
//                     active
//                       ? "bg-primary text-primary-foreground"
//                       : "text-muted-foreground hover:bg-muted hover:text-foreground",
//                   ].join(" ")}
//                 >
//                   <Icon className="size-4 shrink-0" />
//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>
//       </div>

//       <div className="border-t px-4 py-4">
//         <p className="truncate text-xs text-muted-foreground">
//           Rove Addis Labs
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FlaskConical,
  FolderKanban,
  Hash,
  LayoutDashboard,
  Mail,
  Package,
  Settings,
  Tags,
  FileText,
} from "lucide-react";

const navigation = [
  {
    label: "Workspace",
    items: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Projects",
        href: "/dashboard/projects",
        icon: FolderKanban,
      },
      {
        label: "Products",
        href: "/dashboard/products",
        icon: Package,
      },
      {
        label: "Labs",
        href: "/dashboard/labs",
        icon: FlaskConical,
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        label: "Posts",
        href: "/dashboard/posts",
        icon: FileText,
      },
      {
        label: "Categories",
        href: "/dashboard/categories",
        icon: Tags,
      },
      {
        label: "Tags",
        href: "/dashboard/tags",
        icon: Hash,
      },
    ],
  },
  {
    label: "Communication",
    items: [
      {
        label: "Messages",
        href: "/dashboard/messages",
        icon: Mail,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export function DashboardSidebar({
  unreadMessages = 0,
}: {
  unreadMessages?: number;
}) {
  const pathname = usePathname();

  return (
    <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 overflow-y-auto px-3 py-5">
        <nav className="space-y-6">
          {navigation.map((section) => (
            <div key={section.label}>
              <p className="mb-3 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {section.label}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const active =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(`${item.href}/`));

                  const badge =
                    item.href === "/dashboard/messages" && unreadMessages > 0
                      ? unreadMessages > 99
                        ? "99+"
                        : String(unreadMessages)
                      : null;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      ].join(" ")}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{item.label}</span>
                      {badge && (
                        <span
                          className={[
                            "ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold tabular-nums",
                            active
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-accent text-accent-foreground",
                          ].join(" ")}
                        >
                          {badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t px-4 py-4">
        <p className="truncate text-xs text-muted-foreground">
          Rove Addis Labs
        </p>
      </div>
    </div>
  );
}
