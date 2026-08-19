import { brand } from "@/config/brand";

export function DashboardFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} {brand.name}</p>
        <p>{brand.location}</p>
      </div>
    </footer>
  );
}
