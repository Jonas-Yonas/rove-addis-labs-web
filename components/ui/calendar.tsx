import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        month_caption: "relative flex h-9 items-center justify-center",
        caption_label: "text-sm font-semibold",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "size-8 rounded-md p-0",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "size-8 rounded-md p-0",
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-9 rounded-md text-center text-[0.75rem] font-medium text-muted-foreground",
        week: "mt-1 flex w-full",
        day: "relative size-9 p-0 text-center text-sm",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 rounded-md p-0 font-normal aria-selected:opacity-100",
        ),
        selected:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
        today:
          "[&>button]:bg-accent [&>button]:text-accent-foreground [&>button]:font-semibold",
        outside: "text-muted-foreground opacity-40",
        disabled:
          "text-muted-foreground opacity-50 [&>button]:cursor-not-allowed",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
