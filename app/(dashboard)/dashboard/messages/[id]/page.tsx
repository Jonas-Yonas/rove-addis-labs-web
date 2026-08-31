import Link from "next/link";
import { ArrowLeft, Building2, Mail, Reply } from "lucide-react";
import { notFound } from "next/navigation";

import { MarkMessageRead } from "@/components/dashboard/mark-message-read";
import { MessageDeleteAction } from "@/components/dashboard/message-delete-action";
import { MessageStatusSelect } from "@/components/dashboard/message-status-select";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { getMessageById } from "@/lib/messages/queries";

export default async function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const message = await getMessageById(id);

  if (!message) {
    notFound();
  }

  const mailtoHref = `mailto:${message.email}?subject=${encodeURIComponent(
    `Re: ${message.subject}`,
  )}`;

  const received = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(message.created_at));

  return (
    <div className="w-full min-w-0 space-y-6">
      {message.status === "NEW" && <MarkMessageRead messageId={message.id} />}

      <Link
        href="/dashboard/messages"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Messages
      </Link>

      <article className="overflow-hidden rounded-xl border bg-card">
        <div className="space-y-6 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={message.status} />
                <span className="text-xs text-muted-foreground">
                  {received}
                </span>
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                {message.subject}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {message.name}
                </span>
                <a
                  href={`mailto:${message.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-foreground hover:underline"
                >
                  <Mail className="size-3.5" />
                  {message.email}
                </a>
                {message.company && (
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="size-3.5" />
                    {message.company}
                  </span>
                )}
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Button render={<a href={mailtoHref} />}>
                <Reply className="size-4" />
                Reply
              </Button>
              <MessageStatusSelect
                messageId={message.id}
                status={message.status}
              />
              <MessageDeleteAction
                messageId={message.id}
                senderName={message.name}
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="max-w-3xl whitespace-pre-wrap text-sm leading-7 text-foreground">
              {message.message}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
