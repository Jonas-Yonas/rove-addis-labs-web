import type { ReactNode } from "react";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardFooter } from "@/components/layout/dashboard-footer";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { MessagesRealtime } from "@/components/dashboard/messages-realtime";
import { getNewMessageCount } from "@/lib/messages/queries";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const unreadMessages = await getNewMessageCount();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-background font-roboto">
      <MessagesRealtime />

      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r bg-background lg:block">
          <DashboardSidebar unreadMessages={unreadMessages} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader />

          <main className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      <DashboardFooter />
    </div>
  );
}
