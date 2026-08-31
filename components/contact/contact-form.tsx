"use client";

import { useState, useTransition } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { submitContactMessage } from "@/lib/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      const result = await submitContactMessage(formData);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setSent(true);
    });
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center shadow-sm">
        <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-6" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">Message sent</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Thanks for reaching out — we&apos;ll get back to you by email soon.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setSent(false);
            setError(null);
          }}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required maxLength={120} disabled={isPending} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            disabled={isPending}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">
            Company <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input id="company" name="company" maxLength={160} disabled={isPending} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            required
            maxLength={200}
            disabled={isPending}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          disabled={isPending}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="h-11 w-full px-6 sm:w-auto"
      >
        {isPending ? "Sending..." : "Send message"}
        {!isPending && <ArrowRight className="size-4" />}
      </Button>
    </form>
  );
}
