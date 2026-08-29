"use client";

import * as React from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

function parseDateTime(value?: string) {
  if (!value) return undefined;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toLocalInputValue(date?: Date) {
  if (!date) return "";

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// Value submitted with the form. A full ISO string (with UTC offset) so the
// server stores the exact instant the user picked, regardless of the server's
// timezone. `toLocalInputValue` is kept for native <input type="datetime-local">.
function toFormValue(date?: Date) {
  return date ? date.toISOString() : "";
}

function formatDate(date?: Date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function to12Hour(hours: number) {
  const normalized = hours % 12;
  return normalized === 0 ? 12 : normalized;
}

function to24Hour(hour12: number, period: "AM" | "PM") {
  if (period === "AM") return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
}

function getPeriod(hours: number): "AM" | "PM" {
  return hours >= 12 ? "PM" : "AM";
}

const TIME_COLUMN_HEIGHT = "h-45"; // 180px — keeps every column the same height
const columnLabelClass =
  "mb-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground";
const columnFrameClass =
  "rounded-lg border bg-background p-1 " + TIME_COLUMN_HEIGHT;
const optionClass =
  "flex w-full items-center justify-center rounded-md text-sm tabular-nums transition-colors";
const optionActiveClass = "bg-primary font-semibold text-primary-foreground";
const optionIdleClass =
  "text-foreground hover:bg-accent hover:text-accent-foreground";

function TimeScrollColumn({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const activeRef = React.useRef<HTMLButtonElement>(null);

  // Center the selected option whenever the popover opens (mount) or the value
  // changes, so an edited value is visible without scrolling by hand.
  React.useEffect(() => {
    const list = listRef.current;
    const active = activeRef.current;
    if (!list || !active) return;

    list.scrollTop =
      active.offsetTop - list.clientHeight / 2 + active.clientHeight / 2;
  }, [value]);

  return (
    <div className="flex min-w-0 flex-col">
      <p className={columnLabelClass}>{label}</p>

      <div
        ref={listRef}
        className={cn(
          columnFrameClass,
          "overflow-y-auto [scrollbar-width:thin]",
          "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent",
        )}
      >
        {options.map((option) => {
          const active = option === value;

          return (
            <button
              key={option}
              ref={active ? activeRef : undefined}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                optionClass,
                "h-8",
                active ? optionActiveClass : optionIdleClass,
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PeriodColumn({
  value,
  onChange,
}: {
  value: "AM" | "PM";
  onChange: (value: "AM" | "PM") => void;
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <p className={columnLabelClass}>AM/PM</p>

      <div className={cn(columnFrameClass, "grid grid-rows-2 gap-1")}>
        {(["AM", "PM"] as const).map((option) => {
          const active = option === value;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                optionClass,
                "h-full",
                active ? optionActiveClass : optionIdleClass,
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateTimePicker({
  value,
  onChange,
  name,
  defaultValue,
  placeholder = "Select date and time",
  disabled = false,
  className,
  minDate,
  maxDate,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(
    () => value ?? parseDateTime(defaultValue),
  );

  const selected = value !== undefined ? value : internalValue;

  function commit(next: Date | undefined) {
    setInternalValue(next);
    onChange?.(next);
  }

  function updateDate(date: Date | undefined) {
    if (!date) {
      commit(undefined);
      return;
    }

    const next = new Date(selected ?? date);

    next.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());

    commit(next);
  }

  function updateTime(
    hour12: number,
    minute: number,
    period: "AM" | "PM",
  ) {
    const next = new Date(selected ?? new Date());
    next.setHours(to24Hour(hour12, period), minute, 0, 0);

    commit(next);
  }

  function updateHour(value: string) {
    updateTime(
      Number(value),
      selected?.getMinutes() ?? 0,
      getPeriod(selected?.getHours() ?? 0),
    );
  }

  function updateMinute(value: string) {
    updateTime(
      to12Hour(selected?.getHours() ?? 0),
      Number(value),
      getPeriod(selected?.getHours() ?? 0),
    );
  }

  function updatePeriod(value: string) {
    updateTime(
      to12Hour(selected?.getHours() ?? 0),
      selected?.getMinutes() ?? 0,
      value as "AM" | "PM",
    );
  }

  function clear() {
    commit(undefined);
  }

  const hour = selected ? pad(to12Hour(selected.getHours())) : "12";
  const minute = selected ? pad(selected.getMinutes()) : "00";
  const period = selected ? getPeriod(selected.getHours()) : "AM";

  const hourOptions = Array.from({ length: 12 }, (_, index) =>
    pad(index + 1),
  );
  const minuteOptions = Array.from({ length: 60 }, (_, index) => pad(index));

  return (
    <div className={cn("space-y-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "h-10 w-full justify-between px-3 font-normal",
              !selected && "text-muted-foreground",
            )}
          >
            <span className="flex min-w-0 items-center gap-2 truncate">
              <CalendarDays className="size-4 shrink-0" />
              <span className="truncate">
                {selected
                  ? `${formatDate(selected)} at ${hour}:${minute} ${period}`
                  : placeholder}
              </span>
            </span>

            <ChevronDown className="size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={6}
          className="w-auto max-w-[calc(100vw-2rem)] overflow-hidden p-0"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="border-b sm:border-b-0 sm:border-r">
              <Calendar
                mode="single"
                selected={selected}
                defaultMonth={selected}
                onSelect={updateDate}
                disabled={[
                  ...(minDate ? [{ before: minDate }] : []),
                  ...(maxDate ? [{ after: maxDate }] : []),
                ]}
                autoFocus
              />
            </div>

            <div className="flex w-full flex-col p-4 sm:w-64">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Clock3 className="size-4 text-muted-foreground" />
                  Time
                </div>

                <span
                  className={cn(
                    "rounded-md px-2 py-1 text-xs font-medium tabular-nums",
                    selected
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {hour}:{minute} {period}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <TimeScrollColumn
                  label="Hour"
                  value={hour}
                  options={hourOptions}
                  onChange={updateHour}
                />
                <TimeScrollColumn
                  label="Min"
                  value={minute}
                  options={minuteOptions}
                  onChange={updateMinute}
                />
                <PeriodColumn value={period} onChange={updatePeriod} />
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={!selected}
                  onClick={clear}
                  className="text-muted-foreground"
                >
                  <X className="mr-1.5 size-4" />
                  Clear
                </Button>

                <Button
                  type="button"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  <Check className="mr-1.5 size-4" />
                  Done
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {name && (
        <input type="hidden" name={name} value={toFormValue(selected)} />
      )}
    </div>
  );
}

export { DateTimePicker, toLocalInputValue };
