import Link from "next/link";
import { Mail } from "lucide-react";

import { MessageFilters } from "@/components/dashboard/message-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/status-badge";
import { getMessages, getNewMessageCount } from "@/lib/messages/queries";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? "";
  const status = params.status ?? "ALL";
  const parsedPage = Number(params.page);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const [messages, newCount] = await Promise.all([
    getMessages({ search, status, page, pageSize: 10 }),
    getNewMessageCount(),
  ]);

  return (
    <div className="w-full min-w-0 space-y-6">
      <PageHeader
        eyebrow="Communication"
        title="Messages"
        description={
          newCount > 0
            ? `${newCount} new message${newCount === 1 ? "" : "s"} awaiting a first read.`
            : "Contact-form submissions from the Rove Addis Labs website."
        }
      />

      <MessageFilters search={search} status={status} />

      {messages.data.length === 0 ? (
        <EmptyState
          icon={Mail}
          title={
            search || status !== "ALL" ? "No messages found" : "No messages yet"
          }
          description={
            search || status !== "ALL"
              ? "Try adjusting your search or filters."
              : "Submissions from the website contact form will appear here."
          }
        />
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border bg-card">
            <ul className="divide-y">
              {messages.data.map((message) => (
                <li key={message.id}>
                  <Link
                    href={`/dashboard/messages/${message.id}`}
                    className="flex flex-col gap-2 p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={
                            message.status === "NEW"
                              ? "font-semibold"
                              : "font-medium"
                          }
                        >
                          {message.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {message.email}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-sm font-medium">
                        {message.subject}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                        {message.message}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                      <StatusBadge status={message.status} />
                      <span className="text-xs text-muted-foreground">
                        {new Intl.DateTimeFormat("en", {
                          dateStyle: "medium",
                        }).format(new Date(message.created_at))}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Pagination
            page={messages.page}
            pageSize={messages.pageSize}
            totalItems={messages.count}
            noun="messages"
          />
        </>
      )}
    </div>
  );
}
