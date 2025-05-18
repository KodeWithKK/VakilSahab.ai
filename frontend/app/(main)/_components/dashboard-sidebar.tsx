"use client";

import { usePathname, useRouter } from "next/navigation";

import { IconSearch } from "@/lib/icons";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    name: "Find Lawyer",
    href: "/dashboard",
    icon: IconSearch,
  },
];

function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="py-0">
      {sidebarItems.map((item) => (
        <button
          key={`sidebar-${item.href}`}
          className={cn(
            "group flex w-full items-center gap-3 overflow-hidden rounded-lg p-2",
            pathname === item.href
              ? "bg-secondary/50"
              : "hover:bg-secondary/30",
          )}
          onClick={() => router.push(item.href)}
        >
          <IconSearch className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm">{item.name}</p>
        </button>
      ))}
    </div>
  );
}

export default DashboardSidebar;
